import React from "react";
import Update from "./Update";
import ForgetPass from "./ForgetPassword";
import { useTracker } from "../utils/hooks/userContext";

const ParentUpdate = () => {
  const { users } = useTracker();
  return (
    <div>
      <Update users={users} />
      <ForgetPass users={users} />
    </div>
  );
};

export default ParentUpdate;
