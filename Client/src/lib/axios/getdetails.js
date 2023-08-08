import server from "./server";

export const editUsers = async (body, id) =>
  await server.put(`/updateUser/${id}`, body);
export const editPassword = async (body) =>
  await server.put(`/updatePassword`, body);

export const postUsers = async (values) => await server.post("/login", values);

export const postRsgisterUsers = async (users) =>
  await server.post("/register", users);

export const postExpense = async (expense) =>
  await server.post("/addExpense", expense);

export const getUser = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:3007/getUser", {
    method: "GET",
    headers: { token },
  });
  return await res.json();
};

export const updateExpense = async (body, id) =>
  await server.put(`/updateExpense/${id}`, body);

export const deleteExpense = async (id) =>
  await server.delete(`/deleteExpense/${id}`);

export const overViewData = async (requestData) => {
  const response = await fetch(`http://localhost:3007/filterExpense`, {
    method: "GET",
    headers: requestData,
  });
  return await response.json();
};

export const searchItem = async (query) =>
  await server.get(`/searchData?${query}`);

export const getProfile = async (id) => await server.get(`/getProfile/${id}`);

export const removeProfile = async (id, body) =>
  await server.put(`/removeProfile/${id}`, body);
