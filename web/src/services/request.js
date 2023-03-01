import axios from "axios";

const request = axios.create({
  baseURL: "/api/",
  timeout: 2 * 60 * 1000,
});

export default request;
