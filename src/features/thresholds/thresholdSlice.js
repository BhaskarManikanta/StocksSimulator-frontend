import { createSlice } from "@reduxjs/toolkit";

const thresholdSlice = createSlice({
  name: "thresholds",
  initialState: {
    items: [],
  },
  reducers: {
    setThresholds: (state, action) => {
      state.items = action.payload;
    },
    addThreshold: (state, action) => {
      state.items.push(action.payload);
    },
    removeThreshold: (state, action) => {
      state.items = state.items.filter((t) => t._id !== action.payload);
    },
  },
});

export const { setThresholds, addThreshold, removeThreshold } =
  thresholdSlice.actions;
export default thresholdSlice.reducer;
