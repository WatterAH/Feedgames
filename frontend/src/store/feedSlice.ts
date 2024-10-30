import { PostInterface } from "@/interfaces/Post";
import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./store";
import { deletePostById, feedPosts } from "@/routes/post";
import { toast } from "sonner";
import {
  deletePost,
  REMOVE_POST,
  RemovePostAction,
  RESET_ALL,
  UPDATE_POST,
  UPDATE_POST_INTERACTION,
  UpdatePostInteractionAction,
  UpdatePostAction,
} from "./actions";
import { updatePostInteraction } from "./listeners";

interface FeedState {
  posts: PostInterface[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  page: number;
}

const initialState: FeedState = {
  posts: [],
  loading: false,
  error: null,
  hasMore: true,
  page: 0,
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    fetchPostsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPostsSuccess: (state, action) => {
      state.posts = [...state.posts, ...action.payload.posts];
      state.hasMore = action.payload.hasMore;
      state.page = action.payload.hasMore ? state.page + 1 : state.page;
      state.loading = false;
    },
    fetchPostsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    addPost: (state, action) => {
      if (state.posts.length != 0) {
        state.posts.unshift(action.payload);
      }
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
      state.hasMore = true;
      state.page = 0;
    });
    builder.addCase(UPDATE_POST, (state, action: UpdatePostAction) => {
      const { postId, content } = action.payload;
      const post = state.posts.find((post) => post.id === postId);
      if (post) {
        post.edited = true;
        post.content = content;
      }
    });
  },
});

export const {
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailure,
  addPost,
} = feedSlice.actions;

export default feedSlice.reducer;

// GET FEED THUNK
export const fetchPosts =
  (userId: string, limit: number) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const { hasMore, page } = getState().feed;
    if (!hasMore) return;

    try {
      dispatch(fetchPostsStart());
      const data = await feedPosts(userId, page, limit);
      const hasMore = data.length > 0;
      dispatch(
        fetchPostsSuccess({
          posts: data,
          hasMore,
          page: hasMore ? page + 1 : page,
        })
      );
    } catch (error: any) {
      dispatch(fetchPostsFailure(error.message));
    }
  };

//  DELETE POST THUNK
export const removePost = (id: string) => async (dispatch: AppDispatch) => {
  toast.promise(deletePostById(id), {
    loading: "Eliminando...",
    success: () => {
      dispatch(deletePost(id));
      return "Eliminado";
    },
    error: (err) => err.message,
  });
};
