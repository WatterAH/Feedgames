import { PostInterface } from "@/interfaces/Post";
import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";
import { getTendencyPost } from "@/routes/suggestions";

interface tendencySlice {
  posts: PostInterface[];
  loading: boolean;
  error: string | null;
}

const initialState: tendencySlice = {
  posts: [],
  loading: false,
  error: null,
};

const tendencySlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    fetchTendencyStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTendencySuccess: (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    },
    fetchTendencyFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    resetTendency: (state) => {
      state.posts = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  fetchTendencyStart,
  fetchTendencySuccess,
  fetchTendencyFailure,
  resetTendency,
} = tendencySlice.actions;

export default tendencySlice.reducer;

export const fetchTendency =
  (userId: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchTendencyStart());
      const data = await getTendencyPost(userId);
      dispatch(fetchTendencySuccess(data));
    } catch (error: any) {
      dispatch(fetchTendencyFailure(error.message));
    }
  };
