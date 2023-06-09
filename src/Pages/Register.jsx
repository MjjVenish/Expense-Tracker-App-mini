import { Form, Formik, Field, ErrorMessage } from "formik";
import React from "react";
import FormError from "../components/FormError";
import { postRsgisterUsers } from "../lib/axios/getdetails";
const initialValues = {
  username: "",
  email: "",
  password: "",
  repassword: "",
  gender: "",
};
const Register = () => {
  const genders = [
    { gender: "male", key: "Male" },
    { gender: "female", key: "Female" },
    { gender: "others", key: "Others" },
  ];
  const validate = (values) => {
    let errors = {};
    if (!values.username) errors.username = "*Username Required";
    else if (values.username < 5)
      errors.username = "Username Minimum 5 Charcter";
    if (!values.email) errors.email = "*Email Required";
    else if (!values.email.endsWith("@gmail.com"))
      errors.email = "Email Invalid";
    if (!values.password) errors.password = "*Password Required";
    else if (values.password < 6)
      errors.password = "Password Minimum 6 Charcter";
    if (!values.repassword) errors.repassword = "*Conform Password Required";
    else if (!(values.repassword === values.password))
      errors.repassword = "Password Does not Match";
    if (!values.gender) errors.gender = "*Required";
    return errors;
  };
  const handleSubmit = (values, props) => {
    postRsgisterUsers(values);
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
            <Form>
              <div>
                <label htmlFor="username">
                  UserName
                  <Field id="username" name="username" />
                </label>
                <ErrorMessage name="username" component={FormError} />
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
                  <Field id="password" name="password" />
                </label>
                <ErrorMessage name="password" component={FormError} />
              </div>
              <div>
                <label htmlFor="repassword">
                  Conform Password
                  <Field id="repassword" name="repassword" />
                </label>
                <ErrorMessage name="repassword" component={FormError} />
              </div>
              <div>
                <Field name="gender">
                  {({ field }) =>
                    genders.map((gender) => (
                      <React.Fragment key={gender.key}>
                        <input
                          type="radio"
                          id={gender.gender}
                          {...field}
                          value={gender.gender}
                          checked={field.value === gender.gender}
                        />
                        <label htmlFor={gender.gender}>{gender.key}</label>
                      </React.Fragment>
                    ))
                  }
                </Field>
                <ErrorMessage name="gender" component={FormError} />
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
