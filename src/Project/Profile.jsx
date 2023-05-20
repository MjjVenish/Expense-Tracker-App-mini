import React from "react";

const ProfilePage = () => {
  return (
    <div>
      <button onClick={() => localStorage.removeItem("users")}>logout</button>
    </div>
  );
};
export default ProfilePage;
