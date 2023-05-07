import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { setUserData } from "./actions";

export interface UserInitialState {
  data: User | null;
}

const initialState: UserInitialState = {
  data: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData,
  },
});

export const userSelector = (state: RootState) => state.user;

export default userSlice.reducer;
