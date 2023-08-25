import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  FcHome,
  FcAddImage,
  FcViewDetails,
  FcNegativeDynamic,
  FaUserEdit,
  FaUserTie,
  RiLoginBoxFill,
  FaCashRegister,
  MdOutlineArrowDropDown,
  MdArrowDropUp,
} from "../Icons/icons";
import { userThunk } from "../Featuers/ExpenseTrackerApp/Expenseslice";

const NavBar = () => {
  const users = useSelector((store) => store.expenseTracker.user);
  const dispatch = useDispatch();
  const [profile, setProfile] = useState({ image: null, dropDown: false });
  console.log(users);

  useEffect(() => {
    dispatch(userThunk());
    setProfile({ ...profile, image: users?.image });
  }, []);
  return (
    <nav className="flex-1 font-thin padding-nav bg-nav ">
      <div
        onClick={() => setProfile({ ...profile, dropDown: !profile.dropDown })}
        className="cursor"
      >
        <div className="flex">
          <img
            className="nav-pro"
            src={`http://localhost:3007/image${users?.image}`}
            alt=""
          />
          <h3 style={{ paddingTop: "10px" }}>{users?.user_name}</h3>
          {profile.dropDown ? (
            <MdArrowDropUp className="arrow-nav" />
          ) : (
            <MdOutlineArrowDropDown className="arrow-nav" />
          )}
        </div>
        {profile.dropDown && (
          <div className="pad-navlink">
            <NavLink to={"/profile/update"} className="navlink drop">
              <FaUserEdit /> Edit User
            </NavLink>
            <br />
            <NavLink to={"/profile"} className="navlink drop">
              <FaUserTie /> View Profile
            </NavLink>
          </div>
        )}
      </div>
      <div className="pad-navlink">
        <NavLink to="/" className="navlink">
          <FcHome /> Home
        </NavLink>
      </div>
      <div className="pad-navlink">
        <NavLink to="/addExpense" className="navlink">
          <FcAddImage /> AddExpense
        </NavLink>
      </div>
      <div className="pad-navlink">
        <NavLink to="/details" className="navlink">
          <FcViewDetails /> DashBorad
        </NavLink>
      </div>
      <div className="pad-navlink">
        <NavLink to="/overview" className="navlink">
          <FcNegativeDynamic /> Overviews
        </NavLink>
      </div>
      <div className="pad-navlink">
        <NavLink to="/profile" className="navlink">
          <FaUserTie /> Profile
        </NavLink>
      </div>
      <div className="pad-navlink">
        <NavLink to="/login" className="navlink">
          <RiLoginBoxFill /> Login
        </NavLink>
      </div>
      <div className="pad-navlink">
        <NavLink to="/register" className="navlink">
          <FaCashRegister /> Sgin up
        </NavLink>
      </div>
    </nav>
  );
};
export default NavBar;
