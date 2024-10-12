import { configureStore } from "@reduxjs/toolkit";
import emailSlice from "./emailSlice";

const store = configureStore({
  reducer: {
    emailBody: emailSlice,
  },
});

export default store;
