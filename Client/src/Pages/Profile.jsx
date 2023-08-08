import { useNavigate, Navigate } from "react-router-dom";
import {
  RiAccountCircleFill,
  RiShieldFlashFill,
  FcPrivacy,
  FcSettings,
  RiLogoutBoxRLine,
  FcCamera,
  MdDelete,
} from "../Icons/icons";
import { useTracker } from "../utils/hooks/userContext";
import { useEffect, useState } from "react";
import DeleteOption from "../components/DeleteOption";
import { getProfile, removeProfile } from "../lib/axios/getdetails";

const userToken = localStorage.getItem("token");

const ProfilePage = () => {
  const navigate = useNavigate();
  const { users } = useTracker();
  const [profile, setProfile] = useState(null);
  const [options, setOptions] = useState({
    choice: false,
    message: "Are You Sure Logout From This WepSite",
  });

  useEffect(() => {
    getProfile(users?.id)
      .then((result) => {
        const { userProfile } = result.data;
        setProfile(userProfile?.image);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleOption = (value) => {
    if (value) {
      localStorage.removeItem("token");
      navigate("/login");
      setOptions({ ...options, choice: false });
    } else {
      setOptions({ ...options, choice: false });
    }
  };

  const profileDelete = () => {
    const value = { data: "" };
    removeProfile(users.id, value)
      .then((res) => {
        setProfile(res.data.userProfile);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="h-full">
      {userToken ? (
        <>
          <div>
            <div className="">
              {profile ? (
                <img
                  src={`http://localhost:3007/image${profile}`}
                  className="profile-img"
                />
              ) : (
                users?.loginName?.slice(0, 1)?.toUpperCase()
              )}
            </div>
            <FcCamera onClick={() => navigate("/profile/upload")} />
            <MdDelete onClick={profileDelete} />
            <h2 className="captlized">{users?.username}</h2>
            <p>{users?.email}</p>
          </div>
          <div>
            <button onClick={() => navigate("/profile/update")}>
              Edit User
            </button>
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
          <div onClick={() => setOptions({ ...options, choice: true })}>
            <RiLogoutBoxRLine />
            <h4>Logout</h4>
          </div>
          {options.choice && (
            <DeleteOption options={options} handleOption={handleOption} />
          )}
        </>
      ) : (
        <Navigate to={"/login"} />
      )}
    </div>
  );
};
export default ProfilePage;
