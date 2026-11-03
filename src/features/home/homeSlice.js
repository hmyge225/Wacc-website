import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
  name: "home",
  initialState: { count: 0 },
  reducers: {
    increment(state) {
      state.count += 1;
    },
    reset(state) {
      state.count = 0;
    },
  },
});

export const { increment, reset } = homeSlice.actions;
export const selectCount = (state) => state.home.count;
export default homeSlice.reducer;
