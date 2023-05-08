import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { authFunction, logoutFunction, setUser } from "./actions";

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
      .addCase(authFunction.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.loading = false;
      })
      .addCase(authFunction.pending, (state) => {
        state.loading = true;
      })
      .addCase(authFunction.rejected, (state, {}) => {
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
