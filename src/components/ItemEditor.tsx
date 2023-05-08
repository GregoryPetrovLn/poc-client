import { Form, Formik } from "formik";
import * as Yup from "yup";

import { AUTH_TOKEN } from "@/service/localStorageItems";
import { getItemFromLocalStorage } from "@/service/utils";
import { useRouter } from "next/router";
import { FC } from "react";
import { toast } from "react-hot-toast";
import Card from "./Card";
import Input from "./Input";

let validationSchema = Yup.object({
  name: Yup.string()
    .required("Required")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
    .min(3, "Must be at least 3 characters"),
  description: Yup.string()
    .required("Required")
    .min(6, "Description must be at least 6 characters")
    .max(40, "Description must be max 40 characters"),
  price: Yup.number().required("Required").min(0, "Price must be at least 0"),
  quantity: Yup.number()
    .required("Required")
    .min(0, "Quantity must be at least 0"),
});

interface Props {
  data?: Product | null;
}
const ItemEditor: FC<Props> = ({ data }) => {
  const { _id: id } = (data ? data : {}) as Product;
  const router = useRouter();

  const handleItem = async (values: Product, id?: string) => {
    const notification = toast.loading(id ? "Updating..." : "Creating...");
    try {
      const url = id
        ? `${process.env.API_BASE_URL}/products/${id}`
        : `${process.env.API_BASE_URL}/products`;

      const method = id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getItemFromLocalStorage(AUTH_TOKEN)}`,
        },
      });

      const { data, success } = await res.json();

      if (success) {
        router.push(id ? `/products/${data._id}` : `/products`);
        const successMessage = id
          ? "Updated successfully"
          : "Created successfully";
        toast.success(successMessage, { id: notification });
      } else {
        throw new Error();
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong", { id: notification });
    }
  };

  const handleSubmit = (values: Product) => {
    if (data) {
      //UPDATE
      handleItem(values, id);
    } else {
      //CREATE
      handleItem(values);
    }
  };
  const initialValues = {
    name: "",
    description: "",
    price: 0,
    quantity: 0,
  };
  return (
    <Card>
      <Formik
        initialValues={data ? data : initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values, setFieldValue, resetForm }) => (
          <Form>
            <Input
              name="name"
              type="name"
              label="Product name"
              id="name"
              errors={errors}
              touched={touched}
            />
            <Input
              name="description"
              type="description"
              label="Description"
              id="description"
              errors={errors}
              touched={touched}
            />
            <Input
              name="price"
              type="price"
              label="Price"
              id="price"
              errors={errors}
              touched={touched}
            />
            <Input
              name="quantity"
              type="quantity"
              label="Quantity"
              id="quantity"
              errors={errors}
              touched={touched}
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline w-full rounded-full mb-4"
            >
              {data ? "Update" : "Create"}
            </button>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default ItemEditor;
