import { configureStore } from "@reduxjs/toolkit";
import { useDispatch as systemUseDispatch } from "react-redux";
import userReducer from "./slices/user/userSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
    },
  });
};

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useDispatch: () => AppDispatch = systemUseDispatch;
