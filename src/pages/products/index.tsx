import Card from "@/components/Card";
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
  const onRowClickHandler = (id: string) => {
    console.log("Clicket->", id);
  };
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
  const res = await fetch(`${process.env.API_BASE_URL}/api/products`);
  const { data, count } = await res.json();

  return {
    props: { data, count },
  };
}

export default Products;
