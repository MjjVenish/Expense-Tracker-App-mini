import React from "react";
import { FaUserTie } from "react-icons/fa";
import { FcAddImage, FcHome, FcViewDetails } from "react-icons/fc";
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
    </nav>
  );
};
export default NavbarExpense;
