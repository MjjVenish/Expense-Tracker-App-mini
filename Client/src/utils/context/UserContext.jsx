import { createContext, useEffect, useState } from "react";
import { getUser } from "../../lib/axios/getdetails";

export const contextUser = createContext(null);

const UserContext = ({ children }) => {
  const [users, setUsers] = useState(null);
  const [log, setLog] = useState(null);
  const [edit, setEdit] = useState(null);
  const login = (user) => setLog(user);
  useEffect(() => {
    console.log("start");
    getUser()
      .then((result) => setUsers(result))
      .catch((err) => console.log(err));
  }, [log]);

  const editExpense = (tranc) => setEdit(tranc);

  return (
    <contextUser.Provider value={{ users, login, editExpense, edit, setEdit }}>
      {children}
    </contextUser.Provider>
  );
};

export default UserContext;
