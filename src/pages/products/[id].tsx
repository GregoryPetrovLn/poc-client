import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { FC } from "react";

interface Props {
  data: Product | null;
}
const Product: FC<Props> = ({ data }) => {
  const router = useRouter();
  console.log("single product", data);
  return <div>product page with id {router.query.id}</div>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(
    `${process.env.API_BASE_URL}/api/products/${context.query.id}`
  );
  const { data } = await res.json();

  return {
    props: { data },
  };
};

export default Product;
