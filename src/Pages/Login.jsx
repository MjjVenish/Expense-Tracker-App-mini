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
import {
  getRsgisterUsers,
  getUsers,
  editUsers,
  postUsers,
} from "../lib/axios/getdetails";
import { userThunk } from "../Featuers/ExpenseTrackerApp/Expenseslice";

const intialValues = {
  username: "",
  email: "",
  password: "",
  id: 1,
};

const LoginPage = () => {
  const [userData, setUserData] = useState([]);
  const [loginUser, setLoginUser] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    getRsgisterUsers().then(({ data }) => setUserData(data));
    getUsers().then(({ data }) => data.map((val) => setLoginUser(val)));
  }, []);

  const validate = (values) => {
    let errors = {};
    if (!values.username.trim()) errors.username = "UserName Required!";
    else if (values.username.length < 6)
      errors.username = "Please Minimum 6 Charcter Enter";
    if (!values.email.trim()) errors.email = "Email Required!";
    else if (!values.email.endsWith("@gmail.com"))
      errors.email = "Email Invalid";
    if (!values.password.trim()) errors.password = "Password Required!";
    else if (values.password.length < 6)
      errors.password = "Password Enter Minimum 6 Charcter";
    return errors;
  };

  const onSubmit = (values, props) => {
    const checkUsers = (values) => {
      const users = userData.find((user) => user.username === values.username);
      if (
        users.email === values.email &&
        users.password === values.password &&
        users.password === values.password
      ) {
        if (loginUser?.email) {
          navigate("/lets");
          editUsers({
            ...values,
            username: values.username,
            email: values.email,
            password: values.password,
          });
          localStorage.setItem("users", JSON.stringify(values));
          props.resetForm();
        } else {
          postUsers(values);
          navigate("/lets");
          localStorage.setItem("users", JSON.stringify(values));
          props.resetForm();
        }
        dispatch(userThunk(values));
      } else navigate("/register");
    };
    checkUsers(values);
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
            <Form className=" w-h text-alin">
              <FaUsers className="font-big" />
              <div className="relative">
                <Field
                  className={`w-80 p-3 rounded-input pl-input m-input `}
                  type="text"
                  name="username"
                  placeholder="Enter Your Username"
                />
                <FaUser className="absolute icons-pos" />
              </div>
              <ErrorMessage component={FormError} name="username" />
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
                <Link className="text-de">Forget Password?</Link>
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
