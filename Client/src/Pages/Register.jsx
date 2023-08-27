import { Form, Formik, Field, ErrorMessage } from "formik";
import React, { useState } from "react";
import FormError from "../components/FormError";
import { postRsgisterUsers } from "../lib/axios/getdetails";
import { useNavigate } from "react-router-dom";
import GoBack from "../components/GoBack";
import mon from "../assets/image/reg.jpg";

const initialValues = {
  first_name: "",
  last_name: "",
  user_name: "",
  email: "",
  password: "",
};
const Register = () => {
  const [response, setResponse] = useState({ msg: "" });
  const navigate = useNavigate();

  const validate = (values) => {
    let errors = {};
    if (!values.first_name.trim()) errors.first_name = "*Firstname Required";
    else if (values.first_name.trim() < 1)
      errors.first_name = "Enter Minimum 2 Charcter";
    if (!values.last_name.trim()) errors.last_name = "*Lastname Required";
    else if (values.last_name.trim() < 2)
      errors.last_name = "Enter Minimum 2 Charcter";
    if (!values.user_name.trim()) errors.user_name = "*Username Required";
    else if (values.user_name.trim() < 5)
      errors.user_name = "Username Minimum 5 Charcter";
    if (!values.email) errors.email = "*Email Required";
    else if (!values.email.endsWith("@gmail.com"))
      errors.email = "Email Invalid";
    if (!values.password) errors.password = "*Password Required";
    else if (values.password < 6)
      errors.password = "Password Minimum 6 Charcter";
    return errors;
  };
  const handleSubmit = async (values, props) => {
    await postRsgisterUsers(values)
      .then((res) => {
        const { message, token } = res.data;
        setResponse({ msg: message });
        if (!res.status) {
          navigate("/login");
        }
        localStorage.setItem("token", token);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((err) => {
        console.error(err);
      });
    console.log(values);
    props.resetForm();
  };
  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={handleSubmit}
    >
      {(formik) => {
        return (
          <div className="flex just item-center h-fit">
            <div className="reg-form back-set ">
              <img src={mon} alt="" className="reg-form" />
            </div>
            <div>
              <Form className="reg-form border reg-input">
                <h1 className="text-center">Sgin Up</h1>
                {response.msg && <h1>{response.msg}</h1>}
                <label htmlFor="firstname">FirstName*</label>
                <div className="flex flex-dir item-center relative">
                  <Field name="first_name" id="firstname" />
                  <ErrorMessage name="first_name" component={FormError} />
                </div>
                <label htmlFor="lastname">LastName*</label>
                <div className="flex flex-dir item-center relative">
                  <Field name="last_name" id="lastname" />
                  <ErrorMessage name="last_name" component={FormError} />
                </div>
                <label htmlFor="user_name" className="">
                  UserName*
                </label>
                <div className="flex flex-dir item-center relative">
                  <Field id="user_name" name="user_name" />
                  <ErrorMessage name="user_name" component={FormError} />
                </div>
                <label htmlFor="email">Email*</label>
                <div className="flex flex-dir item-center relative">
                  <Field id="email" name="email" />
                  <ErrorMessage name="email" component={FormError} />
                </div>
                <label htmlFor="password">Password*</label>
                <div className="flex flex-dir item-center relative">
                  <Field id="password" name="password" type={"password"} />
                  <ErrorMessage name="password" component={FormError} />
                </div>
                <div className="flex just">
                  <input
                    type="submit"
                    value={"Register"}
                    disabled={!formik.isValid}
                  />
                </div>
              </Form>
            </div>
            <GoBack />
          </div>
        );
      }}
    </Formik>
  );
};
export default Register;
