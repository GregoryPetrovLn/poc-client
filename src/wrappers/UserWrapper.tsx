import { USER } from "@/service/localStorageItems";
import { getItemFromLocalStorage } from "@/service/utils";
import { useEffect } from "react";
import { setUser } from "../../store/slices/user/actions";
import { useDispatch } from "../../store/store";

interface Props {
  children: React.ReactNode;
}
const UserWrapper = ({ children }: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = getItemFromLocalStorage(USER) as User;
    if (user) {
      dispatch(setUser(user));
    }
  }, [dispatch]);
  return <>{children}</>;
};

export default UserWrapper;
