import { AlertInterface } from "@/interfaces/Alert";
import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./store";
import alertRouter from "@/routes/alerts";
import { toast } from "sonner";
import { RESET_ALL } from "./actions";

interface ActivityState {
  alerts: AlertInterface[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  page: number;
  newAlert: boolean;
}

const initialState: ActivityState = {
  alerts: [],
  loading: false,
  error: null,
  hasMore: true,
  page: 0,
  newAlert: false,
};

const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {
    fetchAlertsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAlertsSuccess: (state, action) => {
      state.alerts = [...state.alerts, ...action.payload.notifications];
      state.hasMore = action.payload.hasMore;
      state.page = action.payload.hasMore ? state.page + 1 : state.page;
      state.loading = false;
    },
    fetchAlertsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setNewAlert: (state, action) => {
      state.newAlert = action.payload;
    },
    addAlert: (state, action) => {
      state.alerts.unshift(action.payload);
      state.newAlert = true;
    },
    deleteAlert: (state, action) => {
      state.alerts = state.alerts.filter(
        (alert) => alert.id !== action.payload,
      );
    },
    clearNewNotification: (state) => {
      state.newAlert = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(RESET_ALL, (state) => {
      state.alerts = [];
      state.hasMore = true;
      state.page = 0;
    });
  },
});

export const {
  fetchAlertsStart,
  fetchAlertsSuccess,
  fetchAlertsFailure,
  addAlert,
  setNewAlert,
  deleteAlert,
  clearNewNotification,
} = activitySlice.actions;

export default activitySlice.reducer;

// GET NOTIFICATIONS THUNK
export const fetchAlerts =
  (userId: string, limit: number) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const { hasMore, page } = getState().activity;
    if (!hasMore) return;

    try {
      dispatch(fetchAlertsStart());
      const data = await alertRouter.list(userId, page, limit);
      const hasMore = data.length > 0;
      dispatch(
        fetchAlertsSuccess({
          notifications: data,
          hasMore,
          page: hasMore ? page + 1 : page,
        }),
      );
    } catch (error: any) {
      dispatch(fetchAlertsFailure(error.message));
    }
  };

// REMOVE NOTIFY THUNK

export const removeNotify = (id: string) => async (dispatch: AppDispatch) => {
  toast.promise(alertRouter.delete(id), {
    loading: "Eliminando...",
    success: () => {
      dispatch(deleteAlert(id));
      return "Hecho!";
    },
    error: (err) => err.message,
  });
};
