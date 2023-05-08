import { AUTH_TOKEN, USER } from "@/service/localStorageItems";
import { setItemToLocalStorage } from "@/service/utils";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

interface LoginProps {
  onSuccess: () => void;
  email: string;
  password: string;
}
export const loginFunction = createAsyncThunk(
  "user/login",
  async ({ email, password, onSuccess }: LoginProps) => {
    try {
      const response = await fetch(`${process.env.API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const { token, user } = await response.json();
      if (token) {
        setItemToLocalStorage(AUTH_TOKEN, token);
        setItemToLocalStorage(USER, user);
        onSuccess();
        return user;
      }
    } catch (error) {
      console.log(error);
    }
  }
);
export const logoutFunction = createAsyncThunk("user/logout", async () => {
  try {
    await fetch(`${process.env.API_BASE_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    localStorage.removeItem(AUTH_TOKEN);
    localStorage.removeItem(USER);
  } catch (error) {
    console.log(error);
  }
});

export const setUser = createAction<User | null>("user/setUser");
