import { createContext, useState } from "react";

export const contextUser = createContext(null);

const UserContext = ({ children }) => {
  const [edit, setEdit] = useState(null);

  const editExpense = (tranc) => setEdit(tranc);

  return (
    <contextUser.Provider value={{ editExpense, edit, setEdit }}>
      {children}
    </contextUser.Provider>
  );
};

export default UserContext;
