import React from "react";
import { FcSettings, FcPrivacy } from "react-icons/fc";
import {
  RiAccountCircleFill,
  RiShieldFlashFill,
  RiLogoutBoxRLine,
} from "react-icons/ri";

const ProfilePage = () => {
  const users = JSON.parse(localStorage.getItem("users"));
  return (
    <div>
      <div>
        <div>{users.username[0].toUpperCase()}</div>
        <h2 className="captlized">{users.username}</h2>
        <p>{users.email}</p>
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
      <div>
        <FcSettings />
        <h4>Settings</h4>
      </div>
      <div onClick={() => localStorage.removeItem("users")}>
        <RiLogoutBoxRLine />
        <h4>Logout</h4>
      </div>
    </div>
  );
};
export default ProfilePage;
