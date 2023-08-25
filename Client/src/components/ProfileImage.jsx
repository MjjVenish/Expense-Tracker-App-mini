import { useState } from "react";
import server from "../lib/axios/server";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfileImage = () => {
  const [files, setFiles] = useState(null);
  const users = useSelector((store) => store.expenseTracker.user);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFiles(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("file", files);
    try {
      await server.put(`/upload/${users.id}`, formdata);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleUpload}>
      <input type="file" name="image" onChange={handleChange} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default ProfileImage;
