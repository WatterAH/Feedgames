import feedSlice from "./feedSlice";
import tendencySlice from "./tendencySlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    posts: feedSlice,
    tendency: tendencySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
