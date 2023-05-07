import { HomeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
const Header = () => {
  return (
    <div className="shadow-md w-screen h-auto px-5 py-3 flex justify-between items-center">
      <Link href={"/products"}>
        <div className="text-xl flex items-center">
          <HomeIcon className="w-7 h-7 mr-2" />
          Online Market
        </div>
      </Link>
      <div className="">
        <button className="font-bold text-lg px-4 py-2 hover:bg-gray-300 rounded">
          {false ? "user.name" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Header;
