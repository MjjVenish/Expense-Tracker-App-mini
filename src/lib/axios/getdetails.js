import server from "./server";

export const getUsers = async () => await server.get("/loginUsers");
export const editUsers = async ({ id, ...body }) =>
  await server.put(`/loginUsers/${id}`, body);

export const postUsers = async (values) =>
  await server.post("/loginUsers", values);
export const logoutUsers = async (id) =>
  await server.delete(`/loginUsers/${id}`);

export const postRsgisterUsers = async (users) =>
  await server.post("/usersRegister", users);
export const getRsgisterUsers = async () => await server.get("/usersRegister");
// fetch("http://localhost:3008/usersExpense", {
//   method: "POST",
//   headers: { "content-type": "Mjj" },
//   body: JSON.stringify({ id: 18, name: "Venish" }),
// });
