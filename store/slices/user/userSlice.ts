import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { loginFunction, logoutFunction, setUser } from "./actions";

export interface UserInitialState {
  user: null | User;
  loading: boolean;
}

const initialState: UserInitialState = {
  user: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, { payload }) {
      state.user = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginFunction.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.loading = false;
      })
      .addCase(loginFunction.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginFunction.rejected, (state, {}) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(setUser, (state, { payload }) => {
        state.user = payload;
      })
      .addCase(logoutFunction.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const userSelector = (state: RootState) => state.user;

export default userSlice.reducer;
