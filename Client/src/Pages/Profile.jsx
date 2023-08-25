import { useNavigate, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  RiAccountCircleFill,
  RiShieldFlashFill,
  FcPrivacy,
  FcSettings,
  RiLogoutBoxRLine,
  FcCamera,
  MdDelete,
  FaBell,
  MdOutlineArrowDropDown,
  FaUserEdit,
} from "../Icons/icons";
import { useEffect, useState } from "react";
import DeleteOption from "../components/DeleteOption";
import { getProfile, removeProfile } from "../lib/axios/getdetails";

const userToken = localStorage.getItem("token");

const ProfilePage = () => {
  const users = useSelector((store) => store.expenseTracker.user);
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [options, setOptions] = useState({
    choice: false,
    message: "Are You Sure Logout From This WepSite",
    use: "Logout",
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
    <div className="h-fit flex-3" style={{ background: "#000" }}>
      {userToken ? (
        options.choice ? (
          <DeleteOption options={options} handleOption={handleOption} />
        ) : (
          <>
            <nav
              className="flex border item-center"
              style={{
                justifyContent: "space-between",
                backgroundColor: "#000",
                color: "#fff",
              }}
            >
              <div>
                <h2 style={{ paddingLeft: "12px" }}>My Informations</h2>
              </div>
              <div className="flex item-center">
                <div style={{ marginRight: "50px" }}>
                  <FaBell
                    style={{
                      color: "gold",
                      fontSize: "30px",
                    }}
                  />
                </div>
                <div>
                  {profile ? (
                    <img
                      src={`http://localhost:3007/image${profile}`}
                      alt=""
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                      }}
                    />
                  ) : (
                    <h1>{users?.user_name.slice(0, 1).toUpperCase()}</h1>
                  )}
                </div>
                <h2>Hello {users?.user_name}</h2>
                <MdOutlineArrowDropDown style={{ fontSize: "25px" }} />
              </div>
            </nav>
            <div
              className="flex item-center just"
              style={{
                backgroundColor: "#333030",
                height: "90vh",
                gap: "40px",
                borderRadius: "50px",
              }}
            >
              <div
                className="border"
                style={{
                  backgroundColor: "#000",
                  color: "#fff",
                  height: "60vh",
                  width: "25vw",
                  borderRadius: "30px",
                  boxShadow: "10px 10px 10px #000875",
                }}
              >
                <div className="text-center">
                  {profile ? (
                    <img
                      src={`http://localhost:3007/image${profile}`}
                      className="profile-img"
                    />
                  ) : (
                    <h1
                      className=" text-center flex just"
                      style={{ background: "#000121" }}
                    >
                      {users?.user_name.slice(0, 1).toUpperCase()}
                    </h1>
                  )}
                </div>
                <div
                  className="flex flex-dir item-center"
                  style={{ padding: "10px 5px" }}
                >
                  <h1>My Profile</h1>
                  <h2 className="captlized pad-profile">
                    Name:{users?.user_name}
                  </h2>
                  <button
                    onClick={() => navigate("/profile/upload")}
                    style={{
                      background: "#000",
                      color: "#fff",
                      border: "1px solid #fff",
                      borderRadius: "12px",
                    }}
                    className="pad-profile"
                  >
                    <FcCamera />
                    Change Profile Image
                  </button>
                  <br />
                  {profile && (
                    <button
                      onClick={profileDelete}
                      style={{
                        background: "#000",
                        color: "#fff",
                        border: "1px solid #fff",
                        borderRadius: "12px",
                      }}
                      className="pad-profile"
                    >
                      <MdDelete />
                      Remove Profile
                    </button>
                  )}
                  <p className="pad-profile">Email:{users?.email}</p>
                </div>
              </div>
              <div
                style={{
                  backgroundColor: "#000",
                  color: "#fff",
                  height: "60vh",
                  width: "25vw",
                  borderRadius: "30px",
                  padding: "30px",
                  boxShadow: "10px 10px 10px #000875",
                }}
                className="info"
              >
                <div className="flex ">
                  <FaUserEdit />
                  <button onClick={() => navigate("/profile/update")}>
                    Edit User
                  </button>
                </div>
                <div className="flex ">
                  <RiAccountCircleFill />
                  <h4>Account Info</h4>
                </div>
                <div className="flex">
                  <RiShieldFlashFill />
                  <h4>Security Code</h4>
                </div>
                <div className="flex">
                  <FcPrivacy />
                  <h4>Privacy Policy</h4>
                </div>
                <div
                  onClick={() => navigate("/profile/setting")}
                  className="flex"
                >
                  <FcSettings />
                  <h4>Settings</h4>
                </div>
                <div
                  onClick={() => setOptions({ ...options, choice: true })}
                  className="flex"
                >
                  <RiLogoutBoxRLine />
                  <h4>Logout</h4>
                </div>
              </div>
            </div>
          </>
        )
      ) : (
        <Navigate to={"/login"} />
      )}
    </div>
  );
};
export default ProfilePage;
