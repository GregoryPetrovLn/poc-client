import { getUserInfo } from "@/service/auth";
import { AUTH_TOKEN, USER_NAME } from "@/service/localStorageItems";
import { getItemFromLocalStorage } from "@/service/utils";
import React, { useEffect } from "react";

interface Props {
  children: React.ReactNode;
}
const UserWrapper = ({ children }: Props) => {
  useEffect(() => {
    const token = getItemFromLocalStorage(AUTH_TOKEN);
    const username = getItemFromLocalStorage(USER_NAME);
    if (token && !username) {
      getUserInfo();
    }
  }, []);

  return <>{children}</>;
};

export default UserWrapper;
