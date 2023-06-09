import { NavLink } from "react-router-dom";
import {
  FcHome,
  FcAddImage,
  FcViewDetails,
  FcNegativeDynamic,
  FaUserTie,
  RiLoginBoxFill,
} from "../Icons/icons";

const NavBar = () => {
  return (
    <nav className="flex h-9 bg-nav item-center px-nav">
      <NavLink to="/" className="flex-1 text-alin font-light">
        <FcHome />
      </NavLink>
      <NavLink to="/addExpense" className="flex-1 text-alin font-light">
        <FcAddImage />
      </NavLink>
      <NavLink to="/details" className="flex-1 text-alin font-light">
        <FcViewDetails />
      </NavLink>
      <NavLink to="/overview" className="flex-1 text-alin font-light">
        <FcNegativeDynamic />
      </NavLink>
      <NavLink to="/profile" className="flex-1 text-alin font-light">
        <FaUserTie />
      </NavLink>
      <NavLink to="/login" className="flex-1 text-alin font-light">
        <RiLoginBoxFill />
      </NavLink>
    </nav>
  );
};
export default NavBar;
