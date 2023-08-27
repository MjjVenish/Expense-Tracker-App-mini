import axios from "axios";

const server = axios.create({ baseURL: "http://localhost:3007" });
export default server;
