import ItemEditor from "@/components/ItemEditor";
import { GetServerSideProps } from "next";
import { FC } from "react";
interface Props {
  data: Product | null;
}
const Edit: FC<Props> = ({ data }) => {
  return <ItemEditor data={data} />;
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

export default Edit;
