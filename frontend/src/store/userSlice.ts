import { PostInterface } from "@/interfaces/Post";
import { User } from "@/interfaces/User";
import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./store";
import { changeTheme, editProfile, getProfile } from "@/routes/profile";
import {
  REMOVE_POST,
  RemovePostAction,
  RESET_ALL,
  UPDATE_POST,
  UPDATE_POST_INTERACTION,
  UpdatePostAction,
  UpdatePostInteractionAction,
} from "./actions";
import { getPostsByUser } from "@/routes/post";
import { updatePostInteraction } from "./listeners";
import { toast } from "sonner";
import { Theme } from "@/constants/themes";

interface userSlice {
  user: User | null;
  posts: PostInterface[];
  loadingUser: boolean;
  loadingPosts: boolean;
  errorUser: string | null;
  errorPosts: string | null;
  hasMore: boolean;
  page: number;
  themeLoaded: boolean;
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
  themeLoaded: false,
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
    updateUserSuccess: (state, action) => {
      state.user = action.payload;
    },
    updateUserTheme: (state, action) => {
      if (state.user) {
        state.user.theme = action.payload;
      }
    },
    addMyPost: (state, action) => {
      if (state.posts.length != 0) {
        state.posts.unshift(action.payload);
      }
    },
    loadedTheme: (state) => {
      state.themeLoaded = true;
    },
  },
  extraReducers(builder) {
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
      state.user = null;
      state.posts = [];
      state.page = 0;
      state.hasMore = true;
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
  fetchUserStart,
  fetchUserSuccess,
  fetchUserFailure,
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailure,
  updateUserSuccess,
  updateUserTheme,
  addMyPost,
  loadedTheme,
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

// UPDATE USER DATA THUNK

export const updateUser =
  (
    id: string,
    name: string,
    username: string,
    details: string,
    image: File | null
  ) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    toast.promise(editProfile(id, name, username, details, image), {
      loading: "Actualizando...",
      success: (data) => {
        const { user } = data;
        dispatch(updateUserSuccess(user));
        return "Actualizado con éxito";
      },
      error: (error) => error.message,
    });
  };

// UPDATE USER THEME THUNK

export const updateTheme =
  (userId: string, theme: Theme) => async (dispatch: AppDispatch) => {
    toast.promise(changeTheme(userId, theme), {
      loading: "Cambiando...",
      success: (data) => {
        dispatch(updateUserTheme(data.theme));
        return "Cambiado con éxito";
      },
      error: (err) => err.message,
    });
  };
