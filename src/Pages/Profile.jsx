import { useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { logoutUsers, getUsers } from "../lib/axios/getdetails";
import {
  RiAccountCircleFill,
  RiShieldFlashFill,
  FcPrivacy,
  FcSettings,
  RiLogoutBoxRLine,
} from "../Icons/icons";

const ProfilePage = () => {
  const [users, setUsers] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    getUsers().then(({ data }) => data.map((val) => setUsers(val)));
  }, []);
  return (
    <div className="h-full">
      {users ? (
        <>
          <div>
            <div className="">
              {users?.username?.slice(0, 1)?.toUpperCase()}
            </div>
            <h2 className="captlized">{users?.username}</h2>
            <p>{users?.email}</p>
          </div>
          <div>
            <RiAccountCircleFill />
            <h4>Account Info</h4>
          </div>
          <div>
            <RiShieldFlashFill />
            <h4>Security Code</h4>
          </div>
          <div>
            <FcPrivacy />
            <h4>Privacy Policy</h4>
          </div>
          <div onClick={() => navigate("/profile/setting")}>
            <FcSettings />
            <h4>Settings</h4>
          </div>
          <div
            onClick={() => {
              logoutUsers(users.id);
              navigate("/login");
              localStorage.removeItem("users");
            }}
          >
            <RiLogoutBoxRLine />
            <h4>Logout</h4>
          </div>
        </>
      ) : (
        <Navigate to={"/login"} />
      )}
    </div>
  );
};
export default ProfilePage;
