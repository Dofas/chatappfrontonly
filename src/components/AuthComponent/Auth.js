import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { expireState, tokenState } from "../../state/tokenState/tokenAtom";
import jwt_decode from "jwt-decode";
import customAxios from "../../http";
import axios from "axios";

const Auth = () => {
  const [expire, setExpire] = useRecoilState(expireState);

  customAxios.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get(
          process.env.REACT_APP_API_URL + "/api/token/refresh"
        );
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        localStorage.setItem("auth", response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return null;
};

export default Auth;
