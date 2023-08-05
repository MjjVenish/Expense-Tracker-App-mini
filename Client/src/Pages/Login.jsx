import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  FaUsers,
  MdEmail,
  FaUser,
  FcLock,
  FaArrowAltCircleLeft,
} from "../Icons/icons";
import FormError from "../components/FormError";
import { postUsers } from "../lib/axios/getdetails";
import { userThunk } from "../Featuers/ExpenseTrackerApp/Expenseslice";
import { useTracker } from "../utils/hooks/userContext";

const intialValues = {
  user_name: "",
  email: "",
  password: "",
};

const LoginPage = () => {
  const [response, setResponse] = useState({ msg: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { login } = useTracker();

  const validate = (values) => {
    let errors = {};
    if (!values.user_name.trim()) errors.user_name = "UserName Required!";
    else if (values.user_name.length < 6)
      errors.user_name = "Please Minimum 6 Charcter Enter";
    if (!values.email.trim()) errors.email = "Email Required!";
    else if (!values.email.endsWith("@gmail.com"))
      errors.email = "Email Invalid";
    if (!values.password.trim()) errors.password = "Password Required!";
    else if (values.password.length < 6)
      errors.password = "Password Enter Minimum 6 Charcter";
    return errors;
  };

  const onSubmit = async (values, props) => {
    await postUsers(values)
      .then((res) => {
        console.log(res);
        const { message, token } = res.data;
        localStorage.setItem("token", token);
        setResponse({ msg: message });
        login(message);
        setTimeout(() => {
          navigate("/lets");
        }, 2000);
      })
      .catch((err) => {
        const { message } = err.response.data;
        setResponse({ msg: message });
      });
    props.resetForm();
  };

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={intialValues}
      validate={validate}
    >
      {(formik) => {
        return (
          <div className="grid item-center just h-fit">
            {response.msg && <h3>{response.msg}</h3>}
            <Form className=" w-h text-alin">
              <FaUsers className="font-big" />
              <div className="relative">
                <Field
                  className={`w-80 p-3 rounded-input pl-input m-input `}
                  type="text"
                  name="user_name"
                  placeholder="Enter Your Username"
                />
                <FaUser className="absolute icons-pos" />
              </div>
              <ErrorMessage component={FormError} name="user_name" />
              <div className="relative">
                <Field
                  type="email"
                  className={`w-80 p-3 rounded-input pl-input m-input `}
                  name="email"
                  placeholder="Enter Your Email"
                />
                <MdEmail className="absolute icons-pos" />
              </div>
              <ErrorMessage component={FormError} name="email" />
              <div className="relative">
                <Field
                  type="password"
                  className={`w-80 p-3 rounded-input pl-input m-input `}
                  name="password"
                  placeholder="Enter Your Passward"
                />
                <FcLock className="absolute icons-pos" />
              </div>
              <ErrorMessage component={FormError} name="password" />
              <div>
                <label htmlFor="reminder" className="mr-3">
                  <input type="checkbox" id="reminder" />
                  Remember Me
                </label>
                <Link to={"/profile/update"} className="text-de">
                  Forget Password?
                </Link>
              </div>
              <input
                type="submit"
                value="Login"
                className="login-but border-none"
                disabled={!formik.isValid}
              />
            </Form>
            <FaArrowAltCircleLeft
              className="absolute font-icon"
              onClick={() => navigate("/addExpense")}
            />
          </div>
        );
      }}
    </Formik>
  );
};
export default LoginPage;
