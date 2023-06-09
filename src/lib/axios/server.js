import axios from "axios";

const server = axios.create({ baseURL: "http://localhost:3008" });
export default server;
