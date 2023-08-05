import { Form, Formik, Field, ErrorMessage } from "formik";
import React, { useState } from "react";
import FormError from "../components/FormError";
import { postRsgisterUsers } from "../lib/axios/getdetails";
import { useNavigate } from "react-router-dom";

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
        console.log(token);
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
          <div>
            {response.msg && <h1>{response.msg}</h1>}
            <Form>
              <div>
                <label htmlFor="firstname">FirstName</label>
                <Field name="first_name" id="firstname" />
                <ErrorMessage name="first_name" component={FormError} />
              </div>
              <div>
                <label htmlFor="lastname">LastName</label>
                <Field name="last_name" id="lastname" />
                <ErrorMessage name="last_name" component={FormError} />
              </div>
              <div>
                <label htmlFor="user_name">
                  UserName
                  <Field id="user_name" name="user_name" />
                </label>
                <ErrorMessage name="user_name" component={FormError} />
              </div>
              <div>
                <label htmlFor="email">
                  Email
                  <Field id="email" name="email" />
                </label>
                <ErrorMessage name="email" component={FormError} />
              </div>
              <div>
                <label htmlFor="password">
                  Password
                  <Field id="password" name="password" type={"password"} />
                </label>
                <ErrorMessage name="password" component={FormError} />
              </div>
              <input
                type="submit"
                value={"Register"}
                disabled={!formik.isValid}
              />
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};
export default Register;
