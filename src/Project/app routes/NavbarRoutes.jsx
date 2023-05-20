import React from "react";
import { FaUserTie } from "react-icons/fa";
import {
  FcAddImage,
  FcHome,
  FcViewDetails,
  FcNegativeDynamic,
} from "react-icons/fc";

import { NavLink } from "react-router-dom";
import "../../style/expenseStyle.css";

const NavbarExpense = () => {
  return (
    <nav className="flex h-9 border ">
      <NavLink to="/" className="flex-1">
        <FcHome />
      </NavLink>
      <NavLink to="/addExpense" className="flex-1">
        <FcAddImage />
      </NavLink>
      <NavLink to="/details" className="flex-1">
        <FcViewDetails />
      </NavLink>
      <NavLink to="/profile" className="flex-1">
        <FaUserTie />
      </NavLink>
      <NavLink to="/login" className="flex-1">
        login
      </NavLink>
      <NavLink to="/overview" className="flex-1">
        <FcNegativeDynamic />
      </NavLink>
    </nav>
  );
};
export default NavbarExpense;
