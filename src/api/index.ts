import axios from "axios";
import wsProvider from "@/api/websocket";

export const apiProvider = axios.create({
  baseURL: "http://localhost:3876/api",
});

export { wsProvider };
