import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

const product = () => {
  const router = useRouter();
  return <div>product page with id {router.query.id}</div>;
};

export const getServerSideProps: GetServerSideProps<any> = async (context) => {
  console.log("getServerSideProps", context.query);
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/products?_limit=3"
  );

  const data = await response.json();
  return {
    props: {
      data,
    },
  };
};

export default product;
