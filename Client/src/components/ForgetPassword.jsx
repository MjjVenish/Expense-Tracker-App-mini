import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import FormError from "../components/FormError";
import { editPassword } from "../lib/axios/getdetails";
import { Link } from "react-router-dom";
import GoBack from "./GoBack";
import "../style/update.css";

const ForgetPass = () => {
  const [response, setResponse] = useState({ msg: "" });
  const initial = { user_name: "", password: "" };
  const validate = (values) => {
    let errors = {};
    if (!values.user_name.trim()) errors.user_name = "user_name Required!";
    else if (values.user_name.length < 5)
      errors.user_name = "Username Enter Minimum 5 Charcter";
    if (!values.password.trim()) errors.password = "Password Required!";
    else if (values.password.length < 6)
      errors.password = "Password Enter Minimum 6 Charcter";
    return errors;
  };
  const handlePass = (values, props) => {
    editPassword(values)
      .then((result) => {
        const { message } = result.data;
        setResponse({ msg: message });
      })
      .catch((err) => {
        const { message } = err.response.data;
        setResponse({ msg: message });
      });
    props.resetForm();
  };
  return (
    <Formik initialValues={initial} validate={validate} onSubmit={handlePass}>
      {(formik) => (
        <div className="grid just item-center h-fit up-form">
          <Form>
            <h1 className="text-center">Update Password</h1>
            <div className="grid pa-in">
              {response.msg && (
                <h2 className="text-center" style={{ color: " #c22b09" }}>
                  {response.msg}
                </h2>
              )}
              <Field
                type="text"
                name="user_name"
                placeholder="Enter Your Username"
              />
            </div>
            <div className="grid pa-la">
              <Field
                type="password"
                name="password"
                placeholder="Enter Your Passward"
              />
              <ErrorMessage name="password" component={FormError} />
            </div>
            <div className="text-center pa-bu">
              <input
                type="submit"
                className="updates"
                value={"Update Password"}
                disabled={!formik.isValid}
              />
            </div>
            <div className="text-center">
              <Link
                style={{
                  color: "#000",
                  textDecoration: "none",
                  padding: "7px 0",
                }}
                to={"/login"}
              >
                Go to Login
              </Link>
            </div>
          </Form>
          <GoBack color={"#f0edea"} />
        </div>
      )}
    </Formik>
  );
};
export default ForgetPass;
