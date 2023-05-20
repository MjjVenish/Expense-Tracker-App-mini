import React, { useReducer } from "react";
import { useState } from "react";
const userDetails = {
  id: 1,
  username: "",
  email: "",
  password: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "userName": {
      return { ...state, username: action.payload };
    }
    case "email": {
      return { ...state, email: action.payload };
    }
    case "password": {
      return { ...state, password: action.payload };
    }
    case "reset": {
      return action.payload;
    }
    default:
      return state;
  }
};
const LoginPage = () => {
  const [users, dispatch] = useReducer(reducer, userDetails);
  const [validation, setValidation] = useState({});

  const validate = (user) => {
    let isError = {};
    if (!user.username.trim()) isError.name = "UserName Required";
    else if (user.username.length < 6)
      isError.name = "Please Minium 6 Charcter Enter";
    if (!user.email.trim()) isError.mail = "Email Required";
    else if (!user.email.endsWith("@gmail.com")) isError.mail = "Email Invalid";
    if (!user.password.trim()) isError.pass = "Password Required";
    else if (user.password.length < 8)
      isError.pass = "Password Enter Minimum 8 Charcter";
    return isError;
  };
  const userSubmit = (e) => {
    e.preventDefault();
    setValidation(validate(users));
    localStorage.setItem("users", JSON.stringify(users));
    dispatch({ type: "reset", payload: userDetails });
  };

  return (
    <div>
      <form action="" onSubmit={userSubmit}>
        <label htmlFor="user">
          Enter UserName
          <input
            type="text"
            name="username"
            value={users.username}
            id="user"
            onChange={(e) =>
              dispatch({ type: "userName", payload: e.target.value })
            }
          />
          <span>{validation?.name}</span>
        </label>
        <label htmlFor="email">
          Enter Email
          <input
            type="email"
            name="email"
            id="email"
            value={users.email}
            onChange={(e) =>
              dispatch({ type: "email", payload: e.target.value })
            }
          />
          <span>{validation?.mail}</span>
        </label>
        <label htmlFor="pass">
          Enter PassWord
          <input
            type="password"
            name="password"
            value={users.password}
            id="pass"
            onChange={(e) =>
              dispatch({ type: "password", payload: e.target.value })
            }
          />
          <span>{validation?.pass}</span>
        </label>

        <input type="submit" />
      </form>
    </div>
  );
};
export default LoginPage;
