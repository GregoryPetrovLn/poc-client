import Card from "@/components/Card";
import { GetServerSideProps } from "next";
import { FC } from "react";

interface Props {
  data: Product | null;
}
const Product: FC<Props> = ({ data }) => {
  const { name, description, price, quantity } = data || {};
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
          <span className="text-gray-300 hover:text-gray-400 cursor-default">
            Edit mode only for admins
          </span>
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
