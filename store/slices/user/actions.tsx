import { AUTH_TOKEN, USER } from "@/service/localStorageItems";
import { setItemToLocalStorage } from "@/service/utils";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

interface LoginProps extends User {
  onSuccess: () => void;
  isRegister?: boolean;
}

export const authFunction = createAsyncThunk(
  "user/authenticate",
  async ({
    email,
    password,
    name,
    onSuccess,
    isRegister = false,
  }: LoginProps) => {
    try {
      let url = "";
      let requestBody = {};

      if (isRegister) {
        url = `${process.env.API_BASE_URL}/auth/register`;
        requestBody = { email, password, name };
      } else {
        url = `${process.env.API_BASE_URL}/auth/login`;
        requestBody = { email, password };
      }

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
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
