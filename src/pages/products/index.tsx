import Card from "@/components/Card";
import Table from "@/components/Table";
import { useRouter } from "next/router";
import process from "process";
import { FC } from "react";

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

  const onRowClickHandler = (id: string) => router.push(`/products/${id}`);

  return (
    <Card>
      <div className="text-2xl font-bold mb-4 flex justify-between items-center">
        <span>Products</span>{" "}
        <span className="text-sm font-semibold underline">
          Total:<span className="text-gray-600">{count}</span>
        </span>
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
