import Card from "@/components/Card";
import Input from "@/components/Input";

import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import * as Yup from "yup";

import { authFunction } from "../../../store/slices/user/actions";
import { useDispatch } from "../../../store/store";

interface FormValues {
  name: string;
  email: string;
  password: string;
}

const initialValues = {
  name: "",
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  let validationSchema = Yup.object({
    name: isLogin
      ? Yup.string()
      : Yup.string()
          .required("Required")
          .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
          .min(3, "Must be at least 3 characters"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .required("Required")
      .min(6, "Password must be at least 6 characters"),
  });

  const handleSubmit = (values: FormValues) => {
    const onSuccess = () => {
      router.push("/products");
    };
    if (isLogin) {
      dispatch(authFunction({ ...values, onSuccess }));
    } else {
      dispatch(authFunction({ ...values, onSuccess, isRegister: true }));
    }
  };

  return (
    <Card>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values, setFieldValue, resetForm }) => (
          <Form>
            {!isLogin && (
              <Input
                name="name"
                type="text"
                label="Name"
                id="name"
                errors={errors}
                touched={touched}
              />
            )}

            <Input
              name="email"
              type="email"
              label="Email Address"
              id="email"
              errors={errors}
              touched={touched}
            />
            <Input
              name="password"
              type="password"
              label="Password"
              id="password"
              errors={errors}
              touched={touched}
            />

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline w-full rounded-full mb-4"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
            <span
              className="text-blue-400 hover:text-blue-600 cursor-pointer"
              onClick={() => {
                setIsLogin(!isLogin);
                resetForm();
              }}
            >
              {isLogin ? "SignUp" : "Login"}
            </span>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default Login;
