import { combineReducers } from "@reduxjs/toolkit";
import homeReducer from "@/features/home/homeSlice";

export const rootReducer = combineReducers({
  home: homeReducer,
});
