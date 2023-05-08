import { AUTH_TOKEN, USER } from "@/service/localStorageItems";
import { setItemToLocalStorage } from "@/service/utils";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

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
    role,
    onSuccess,
    isRegister = false,
  }: LoginProps) => {
    const notiication = toast.loading("Started auth process...");

    try {
      let url = "";
      let requestBody = {};

      if (isRegister) {
        url = `${process.env.API_BASE_URL}/auth/register`;
        requestBody = { email, password, name, role };
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
        toast.success("Login success", { id: notiication });
        return user;
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", { id: notiication });
    }
  }
);

export const logoutFunction = createAsyncThunk("user/logout", async () => {
  try {
    const notiication = toast.loading("Logging out...");

    await fetch(`${process.env.API_BASE_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    localStorage.removeItem(AUTH_TOKEN);
    localStorage.removeItem(USER);
    toast.success("Logout success", { id: notiication });
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
});

export const setUser = createAction<User | null>("user/setUser");
