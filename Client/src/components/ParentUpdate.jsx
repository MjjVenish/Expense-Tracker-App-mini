import React from "react";
import Update from "./Update";
import { useSelector } from "react-redux";

const ParentUpdate = () => {
  const users = useSelector((store) => store.expenseTracker.user);
  return (
    <div>
      <Update users={users} />
    </div>
  );
};

export default ParentUpdate;
