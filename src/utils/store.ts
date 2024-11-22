import { configureStore } from "@reduxjs/toolkit";
import emailSlice from "./emailSlice";

// Define the store
const store = configureStore({
  reducer: {
    emailBody: emailSlice, // your email slice reducer
  },
});

// Export the store
export default store;

// Define types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
