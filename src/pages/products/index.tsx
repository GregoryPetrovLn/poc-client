import Table from "@/components/Table";
import process from "process";

interface Props {
  data: Product[] | null;
  count: number;
}

const Products = ({ data, count }: Props) => {
  const tableRender = [
    { id: "name", label: "Name" },
    { id: "price", label: "Price" },
    { id: "quantity", label: "Quantity" },
  ];
  const onRowClickHandler = (id: number) => {};
  return (
    <div className="flex justify-center">
      <div className="w-full md:w-1/2 p-6 bg-white rounded-lg shadow-lg overflow-x-auto mt-10">
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
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetch(`${process.env.API_BASE_URL}/api/products`);
  const { data, count } = await res.json();

  return {
    props: { data, count },
  };
}

export default Products;
