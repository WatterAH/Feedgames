import { PostInterface } from "@/interfaces/Post";
import { User } from "@/interfaces/User";
import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./store";
import { getProfile } from "@/routes/profile";
import {
  REMOVE_POST,
  RemovePostAction,
  RESET_ALL,
  UPDATE_POST_INTERACTION,
  UpdatePostInteractionAction,
} from "./actions";
import { getPostsByUser } from "@/routes/post";

interface userSlice {
  user: User | null;
  posts: PostInterface[];
  loadingUser: boolean;
  loadingPosts: boolean;
  errorUser: string | null;
  errorPosts: string | null;
  hasMore: boolean;
  page: number;
}

const initialState: userSlice = {
  user: null,
  posts: [],
  loadingUser: false,
  loadingPosts: false,
  errorUser: null,
  errorPosts: null,
  hasMore: true,
  page: 0,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    fetchUserStart: (state) => {
      state.loadingUser = true;
      state.errorUser = null;
    },
    fetchUserSuccess: (state, action) => {
      state.user = action.payload.user;
      state.loadingUser = false;
    },
    fetchUserFailure: (state, action) => {
      state.loadingUser = false;
      state.errorUser = action.payload;
    },
    fetchPostsStart: (state) => {
      state.loadingPosts = true;
      state.errorPosts = null;
    },
    fetchPostsSuccess: (state, action) => {
      state.posts = [...state.posts, ...action.payload.posts];
      state.hasMore = action.payload.hasMore;
      state.page = action.payload.hasMore ? state.page + 1 : state.page;
      state.loadingPosts = false;
    },
    fetchPostsFailure: (state, action) => {
      state.errorPosts = action.payload;
      state.loadingPosts = false;
    },
    addMyPost: (state, action) => {
      state.posts.unshift(action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(
      UPDATE_POST_INTERACTION,
      (state, action: UpdatePostInteractionAction) => {
        const { postId, type } = action.payload;
        const post = state.posts.find((post) => post.id === postId);
        if (post) {
          switch (type) {
            case "like":
              post.isLiked = true;
              post.liked++;
              break;
            case "unlike":
              post.isLiked = false;
              post.liked--;
              break;
            case "save":
              post.isSaved = true;
              post.saved++;
              break;
            case "unsave":
              post.isSaved = false;
              post.saved--;
              break;
          }
        }
      }
    );
    builder.addCase(REMOVE_POST, (state, action: RemovePostAction) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    });
    builder.addCase(RESET_ALL, (state) => {
      state.user = null;
      state.posts = [];
      state.page = 0;
      state.hasMore = true;
    });
  },
});

export const {
  fetchUserStart,
  fetchUserSuccess,
  fetchUserFailure,
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailure,
  addMyPost,
} = userSlice.actions;

export default userSlice.reducer;

// GET USER THUNK
export const fetchUser = (userId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchUserStart());
    const data = await getProfile(userId, userId);
    dispatch(fetchUserSuccess({ user: data }));
  } catch (error: any) {
    dispatch(fetchUserFailure(error.message));
  }
};

// GET USER POSTS THUNK
export const fetchPosts =
  (userId: string, limit: number) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const { page, hasMore } = getState().user;
    if (!hasMore) return;

    try {
      dispatch(fetchPostsStart());
      const data = await getPostsByUser(userId, page, limit, userId);
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
