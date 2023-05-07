import { configureStore } from "@reduxjs/toolkit";
import { useDispatch as systemUseDispatch } from "react-redux";

export const makeStore = () => {
  return configureStore({
    reducer: {},
  });
};

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useDispatch: () => AppDispatch = systemUseDispatch;