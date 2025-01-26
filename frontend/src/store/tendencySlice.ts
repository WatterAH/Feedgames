import { PostInterface } from "@/interfaces/Post";
import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";
import {
  REMOVE_POST,
  RemovePostAction,
  RESET_ALL,
  UPDATE_POST,
  UPDATE_POST_INTERACTION,
  UpdatePostAction,
  UpdatePostInteractionAction,
} from "./actions";
import { loadTopLikedPosts } from "@/routes/search";
import { updatePostInteraction } from "./listeners";

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
  },
  extraReducers: (builder) => {
    builder.addCase(
      UPDATE_POST_INTERACTION,
      (state, action: UpdatePostInteractionAction) => {
        const { postId, type } = action.payload;
        const post = state.posts.find((post) => post.id === postId);
        if (post) updatePostInteraction(post, type);
      }
    );
    builder.addCase(REMOVE_POST, (state, action: RemovePostAction) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    });
    builder.addCase(RESET_ALL, (state) => {
      state.posts = [];
      state.loading = false;
      state.error = null;
    });
    builder.addCase(UPDATE_POST, (state, action: UpdatePostAction) => {
      const { postId, text } = action.payload;
      const post = state.posts.find((post) => post.id === postId);
      if (post) {
        post.edited = true;
        post.text = text;
      }
    });
  },
});

export const {
  fetchTendencyStart,
  fetchTendencySuccess,
  fetchTendencyFailure,
} = tendencySlice.actions;

export default tendencySlice.reducer;

export const fetchTendency =
  (userId: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchTendencyStart());
      const data = await loadTopLikedPosts(userId);
      dispatch(fetchTendencySuccess(data));
    } catch (error: any) {
      dispatch(fetchTendencyFailure(error.message));
    }
  };
