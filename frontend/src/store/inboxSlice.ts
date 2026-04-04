import { Party } from "@/interfaces/Party";
import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./store";
import partyRouter from "@/routes/party";
import { RESET_ALL } from "./actions";

interface InboxState {
  parties: Party[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  page: number;
  hasUnread: boolean;
}

const initialState: InboxState = {
  parties: [],
  loading: false,
  error: null,
  hasMore: true,
  page: 0,
  hasUnread: false,
};

const inboxSlice = createSlice({
  name: "inbox",
  initialState,
  reducers: {
    fetchPartiesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPartiesSuccess: (state, action) => {
      state.parties = [...state.parties, ...action.payload.parties];
      state.hasMore = action.payload.hasMore;
      state.page = action.payload.hasMore ? state.page + 1 : state.page;
      state.loading = false;
    },
    fetchPartiesFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    addParty: (state, action) => {
      if (state.parties.length != 0) {
        state.parties.unshift(action.payload);
      }
    },
    setHasUnread: (state, action) => {
      state.hasUnread = action.payload;
    },
    markAsRead: (state, action: { payload: string }) => {
      const partyId = action.payload;
      const party = state.parties.find((p) => p.id === partyId);
      if (party && party.me) {
        party.me.last_read_at = new Date().toISOString();
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(RESET_ALL, (state) => {
      state.parties = [];
      state.hasMore = true;
      state.page = 0;
    });
    builder.addCase;
  },
});

export const {
  fetchPartiesStart,
  fetchPartiesSuccess,
  fetchPartiesFailure,
  addParty,
  setHasUnread,
  markAsRead,
} = inboxSlice.actions;

export default inboxSlice.reducer;

// GET PARTIES THUNK
export const fetchParties =
  (userId: string, limit: number) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const { hasMore, page } = getState().inbox;
    if (!hasMore) return;

    try {
      dispatch(fetchPartiesStart());
      const data = await partyRouter.list(userId, page, limit);
      const hasMore = data.length === limit;
      dispatch(
        fetchPartiesSuccess({
          parties: data,
          hasMore,
          page: hasMore ? page + 1 : page,
        }),
      );
    } catch (error: any) {
      dispatch(fetchPartiesFailure(error.message));
    }
  };
