import { Formik, Form, Field, ErrorMessage } from "formik";
import FormError from "../components/FormError";
import { editUsers } from "../lib/axios/getdetails";
import { useState } from "react";

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
        <Form>
          <>
            <h1>Username and Email Update</h1>
            {response.msg && <h2>{response.msg}</h2>}
            <Field
              type="text"
              name="user_name"
              placeholder="Enter Your Username"
            />
            <ErrorMessage name="user_name" component={<FormError />} />
            <Field type="email" name="email" placeholder="Enter Your email" />
            <ErrorMessage name="email" component={<FormError />} />
          </>
          <input type="submit" value={"Update"} disabled={!formik.isValid} />
        </Form>
      )}
    </Formik>
  );
};

export default Update;
