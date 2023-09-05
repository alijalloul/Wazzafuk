import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import User from "./User.js";
import JobPost from "./JobPost.js";

export default configureStore({
  reducer: {
    user: User,
    jobPosts: JobPost,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
