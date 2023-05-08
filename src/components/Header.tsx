import { AUTH_TOKEN } from "@/service/localStorageItems";
import { getItemFromLocalStorage } from "@/service/utils";
import { HomeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { logoutFunction } from "../../store/slices/user/actions";
import { userSelector } from "../../store/slices/user/userSlice";
import { useDispatch } from "../../store/store";

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, loading } = useSelector(userSelector);
  const handleAuth = () => {
    const token = getItemFromLocalStorage(AUTH_TOKEN);
    if (token) {
      dispatch(logoutFunction());
    } else {
      router.push("/login");
    }
  };
  return (
    <div className="shadow-md w-screen h-auto px-5 py-3 flex justify-between items-center bg-white">
      <Link href={"/products"}>
        <div className="text-xl flex items-center">
          <HomeIcon className="w-7 h-7 mr-2" />
          Online Market
        </div>
      </Link>
      <div className="">
        <button
          className="font-bold text-lg px-4 py-2 hover:bg-gray-300 rounded"
          onClick={handleAuth}
        >
          {loading ? "loading..." : user ? `Hello ${user.name}` : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Header;
