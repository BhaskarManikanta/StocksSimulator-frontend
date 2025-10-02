import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import thresholdReducer from "../features/thresholds/thresholdSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    thresholds: thresholdReducer,
  },
});
