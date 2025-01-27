import { Notification } from "@/interfaces/Notification";
import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./store";
import { deleteNotificationById, getMyNotifications } from "@/routes/alerts";
import { toast } from "sonner";
import { RESET_ALL } from "./actions";

interface ActivityState {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  page: number;
  newNotify: boolean;
}

const initialState: ActivityState = {
  notifications: [],
  loading: false,
  error: null,
  hasMore: true,
  page: 0,
  newNotify: false,
};

const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {
    fetchNotificationsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchNotificationsSuccess: (state, action) => {
      state.notifications = [
        ...state.notifications,
        ...action.payload.notifications,
      ];
      state.hasMore = action.payload.hasMore;
      state.page = action.payload.hasMore ? state.page + 1 : state.page;
      state.loading = false;
    },
    fetchNotificationsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setNewNotify: (state, action) => {
      state.newNotify = action.payload;
    },
    addNotify: (state, action) => {
      state.notifications.unshift(action.payload);
      state.newNotify = true;
    },
    deleteNotify: (state, action) => {
      state.notifications = state.notifications.filter(
        (notify) => notify.id !== action.payload
      );
    },
    clearNewNotification: (state) => {
      state.newNotify = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(RESET_ALL, (state) => {
      state.notifications = [];
      state.hasMore = true;
      state.page = 0;
    });
  },
});

export const {
  fetchNotificationsStart,
  fetchNotificationsSuccess,
  fetchNotificationsFailure,
  addNotify,
  setNewNotify,
  deleteNotify,
  clearNewNotification,
} = activitySlice.actions;

export default activitySlice.reducer;

// GET NOTIFICATIONS THUNK
export const fetchNotifications =
  (userId: string, limit: number) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const { hasMore, page } = getState().activity;
    if (!hasMore) return;

    try {
      dispatch(fetchNotificationsStart());
      const data = await getMyNotifications(userId, page, limit);
      const hasMore = data.length > 0;
      dispatch(
        fetchNotificationsSuccess({
          notifications: data,
          hasMore,
          page: hasMore ? page + 1 : page,
        })
      );
    } catch (error: any) {
      dispatch(fetchNotificationsFailure(error.message));
    }
  };

// REMOVE NOTIFY THUNK

export const removeNotify = (id: string) => async (dispatch: AppDispatch) => {
  toast.promise(deleteNotificationById(id), {
    loading: "Eliminando...",
    success: () => {
      dispatch(deleteNotify(id));
      return "Hecho!";
    },
    error: (err) => err.message,
  });
};
