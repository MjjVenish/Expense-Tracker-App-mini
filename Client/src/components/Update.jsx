import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import FormError from "../components/FormError";
import { editUsers } from "../lib/axios/getdetails";
import "../style/update.css";
import GoBack from "./GoBack";

const initialValues = { user_name: "", email: "" };
const Update = ({ users }) => {
  const [response, setResponse] = useState({ msg: "" });
  const validate = (values) => {
    let errors = {};
    if (!values.user_name.trim()) errors.user_name = "UserName Required!";
    else if (values.user_name.length < 6)
      errors.user_name = "Please Minimum 6 Charcter Enter";
    if (!values.email.trim()) errors.email = "Email Required!";
    else if (!values.email.endsWith("@gmail.com"))
      errors.email = "Email Invalid";
    return errors;
  };
  const handleSubmit = async (values, props) => {
    await editUsers(values, users.id)
      .then((result) => {
        const { message } = result.data;
        setResponse({ msg: message });
      })
      .catch((err) => console.log(err));
    props.resetForm();
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validate={validate}
    >
      {(formik) => (
        <div className="grid just item-center h-fit up-form">
          <Form className="border pa-up">
            <>
              <h1 className="text-center">Username and Email Update</h1>
              {response.msg && <h2 className="text-center">{response.msg}</h2>}
              <div className="grid pa-in">
                <Field
                  type="text"
                  name="user_name"
                  placeholder="Enter Your Username"
                />
                <ErrorMessage name="user_name" component={FormError} />
              </div>
              <div className="grid pa-la">
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter Your email"
                />
                <ErrorMessage name="email" component={FormError} />
              </div>
            </>
            <div className="text-center pa-bu">
              <input
                type="submit"
                className="updates"
                value={"Update"}
                disabled={!formik.isValid}
              />
            </div>
          </Form>
          <GoBack color={"#f0edea"} />
        </div>
      )}
    </Formik>
  );
};

export default Update;
