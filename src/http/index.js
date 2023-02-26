import axios from "axios";

const customAxios = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_URL,
});

export default customAxios;
