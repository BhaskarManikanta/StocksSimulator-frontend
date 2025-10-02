import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");
const savedUser = localStorage.getItem("user");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: token || null,
    user: savedUser ? JSON.parse(savedUser) : null, // restore full user
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.user = { email: action.payload.email, joinAt: action.payload.joinAt}; // ✅ store as object
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify({ email: action.payload.email, joinAt: action.payload.joinAt }));
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
