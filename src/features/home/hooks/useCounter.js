"use client";

import { useAppDispatch, useAppSelector } from "@/shared/hooks/redux";
import { increment, reset, selectCount } from "../homeSlice";

export function useCounter() {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  return {
    count,
    increment: () => dispatch(increment()),
    reset: () => dispatch(reset()),
  };
}
