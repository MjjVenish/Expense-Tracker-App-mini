import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import FormError from "../components/FormError";
import { editPassword } from "../lib/axios/getdetails";

const ForgetPass = ({ users }) => {
  const [response, setResponse] = useState({ msg: "" });
  const initial = { password: "" };
  const validate = (values) => {
    let errors = {};
    if (!values.password.trim()) errors.password = "Password Required!";
    else if (values.password.length < 6)
      errors.password = "Password Enter Minimum 6 Charcter";
    return errors;
  };
  const handlePass = (values, props) => {
    editPassword(values, users.id)
      .then((result) => {
        const { message } = result.data;
        setResponse({ msg: message });
      })
      .catch((err) => console.log(err));
    props.resetForm();
  };
  return (
    <Formik initialValues={initial} validate={validate} onSubmit={handlePass}>
      {(formik) => (
        <Form>
          <h1>Update Password</h1>
          {response.msg && <h2>{response.msg}</h2>}
          <Field
            type="password"
            name="password"
            placeholder="Enter Your Passward"
          />
          <ErrorMessage name="password" component={<FormError />} />
          <input
            type="submit"
            value={"Update Password"}
            disabled={!formik.isValid}
          />
        </Form>
      )}
    </Formik>
  );
};
export default ForgetPass;
