import useError from "@/hooks/useError";
import axios from "axios";
import wsProvider from "@/api/websocket";

export const apiProvider = axios.create({
  baseURL: "http://localhost:3876/api",
  timeout: 100000,
});

console.log("dadas");
const { setError } = useError();

apiProvider.interceptors.request.use(
  (c) => {
    setError(
      `Axios request:\n\nUrl: ${c.url}\n\nData: ${JSON.stringify(
        c.data
      )}\n\nParams: ${JSON.stringify(c.params)}`
    );
    return c;
  },
  (error) => {
    setError(`Interceptor error: ${JSON.stringify(error)}`);
    return Promise.reject(error);
  }
);

export { wsProvider };
