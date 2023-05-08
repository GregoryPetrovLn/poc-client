import Card from "@/components/Card";
import Table from "@/components/Table";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import process from "process";
import { FC } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../../store/slices/user/userSlice";

interface Props {
  data: Product[] | null;
  count: number;
}
const tableRender = [
  { id: "name", label: "Name" },
  { id: "price", label: "Price" },
  { id: "quantity", label: "Quantity" },
];
const Products: FC<Props> = ({ data, count }) => {
  const router = useRouter();
  const { user } = useSelector(userSelector);
  const isAdmin = user?.role === "admin";
  const onRowClickHandler = (id: string) => router.push(`/products/${id}`);

  return (
    <Card>
      <div className="text-2xl font-bold mb-4 flex justify-between items-center">
        <span>Products</span>{" "}
        <span className="text-sm font-semibold underline">
          Total:<span className="text-gray-600">{count}</span>
        </span>
        {isAdmin && (
          <button
            className="text-sm font-semibold flex items-center hover:shadow-md px-5 py-2"
            onClick={() => router.push("/products/create")}
          >
            Add new <PlusCircleIcon className="h-5 w-5 ml-2" />
          </button>
        )}
      </div>
      <Table
        tableRender={tableRender}
        onRowClick={onRowClickHandler}
        list={data}
      />
    </Card>
  );
};

export async function getServerSideProps() {
  const res = await fetch(`${process.env.API_BASE_URL}/products`);
  const { data, count } = await res.json();

  return {
    props: { data, count },
  };
}

export default Products;
