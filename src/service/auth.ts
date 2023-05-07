import { AUTH_TOKEN, USER_NAME } from "./localStorageItems";
import { getItemFromLocalStorage, setItemToLocalStorage } from "./utils";

export const loginFunction = async (
  { email, password }: User,
  onSuccess: () => void
) => {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const { token } = await response.json();
    if (token) {
      setItemToLocalStorage(AUTH_TOKEN, token);
      onSuccess();
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserInfo = async () => {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getItemFromLocalStorage(AUTH_TOKEN)}`,
      },
    });

    const { data } = await response.json();

    if (data) {
      setItemToLocalStorage(USER_NAME, data.name);
    }
  } catch (error) {
    console.log(error);
  }
};
