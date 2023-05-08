import Card from "@/components/Card";
import { AUTH_TOKEN } from "@/service/localStorageItems";
import { getItemFromLocalStorage } from "@/service/utils";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { FC } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { userSelector } from "../../../store/slices/user/userSlice";

interface Props {
  data: Product | null;
}
const Product: FC<Props> = ({ data }) => {
  const { name, description, price, quantity } = data || {};
  const { user } = useSelector(userSelector);
  const isAdmin = user?.role === "admin";
  const router = useRouter();

  const handleDelete = async () => {
    const notification = toast.loading("Deleting...");
    try {
      await fetch(`${process.env.API_BASE_URL}/products/${data?._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getItemFromLocalStorage(AUTH_TOKEN)}`,
        },
      });
      router.push("/products");
      toast.success("Product deleted", { id: notification });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", { id: notification });
    }
  };

  return (
    <Card>
      <h1 className="text-center text-3xl shadow-b-md">Product overview</h1>
      <div className="flex justify-between mt-5">
        <div className="">
          <h1 className="text-xl font-bold">{name}</h1>
          <span className="text-md font-semibold text-gray-700">
            {description}
          </span>
          <div className="flex space-x-5 mt-2 text-gray-700">
            <div>
              Price:{" "}
              <span className="font-semibold text-green-800">{price}$</span>
            </div>
            <div>
              Available: <span className="font-semibold">{quantity} kg</span>
            </div>
          </div>
        </div>
        <div>
          {!isAdmin && (
            <span className="text-gray-300 hover:text-gray-400 cursor-default">
              Edit mode only for admins
            </span>
          )}

          {isAdmin && (
            <div className="flex flex-col space-y-3 text-right">
              <div
                onClick={handleDelete}
                className="text-red-400 hover:text-red-500 cursor-pointer flex items-center justify-end"
              >
                Delete
                <TrashIcon className="h-5 w-5" />
              </div>

              <div className="text-blue-400 hover:text-blue-500 cursor-pointer flex items-center justify-end">
                Edit
                <PencilSquareIcon className="h-5 w-5" />
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(
    `${process.env.API_BASE_URL}/products/${context.query.id}`
  );
  const { data } = await res.json();

  return {
    props: { data },
  };
};

export default Product;
