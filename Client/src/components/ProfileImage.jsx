import React, { useRef, useState } from "react";
import server from "../lib/axios/server";
import { useTracker } from "../utils/hooks/userContext";
import { useNavigate } from "react-router-dom";

const ProfileImage = () => {
  const [files, setFiles] = useState(null);
  const { users } = useTracker();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFiles(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("file", files);
    try {
      const res = await server.put(`/upload/${users.id}`, formdata);
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
