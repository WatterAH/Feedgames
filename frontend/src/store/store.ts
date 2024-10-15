import feedSlice from "./feedSlice";
import tendencySlice from "./tendencySlice";
import activitySlice from "./activity";
import userSlice from "./userSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    feed: feedSlice,
    user: userSlice,
    tendency: tendencySlice,
    activity: activitySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
