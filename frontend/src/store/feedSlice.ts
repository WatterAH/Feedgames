import { PostInterface } from "@/interfaces/Post";
import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./store";
import { deletePostById, feedPosts } from "@/routes/post";
import { toast } from "sonner";

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
  name: "posts",
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
    resetPosts: (state) => {
      state.posts = [];
      state.hasMore = true;
      state.page = 0;
    },
    addPost: (state, action) => {
      state.posts.unshift(action.payload);
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
  },
});

export const {
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailure,
  resetPosts,
  addPost,
  deletePost,
} = feedSlice.actions;

export default feedSlice.reducer;

// GET FEED THUNK
export const fetchPosts =
  (userId: string, limit: number) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const { hasMore, page } = getState().posts;
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
