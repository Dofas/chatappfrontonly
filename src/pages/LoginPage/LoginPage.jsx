import React, { useState } from "react";
import "./login-page.scss";
import { useNavigate } from "react-router-dom";
import { UserService } from "../../utils/UserService/UserService";
import LoginPageImageBackground from "../../assets/images/login-page-image-background.svg";
import InputWithoutBorder from "../../components/ui-components/InputComponents/InputWithoutBorder/InputWithoutBorder";
import {useSetRecoilState} from 'recoil';
import {expireState} from '../../state/tokenState/tokenAtom';
import jwt_decode from 'jwt-decode';

const LoginPage = ({ socket }) => {
  const [nickName, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const setExpire = useSetRecoilState(expireState);

  const handleSubmit = () => {
    if (!nickName || !password) {
      setIsError(true);
      return;
    }
    const data = { nickName, password };
    UserService.loginUser(data)
      .then(async (data) => {
        if (data.status) {
          socket.current.emit("change-status", {
            nickName,
            status: "online",
          });
          localStorage.setItem("auth", data.data.accessToken);
          const decoded = jwt_decode(data.data.accessToken);
          setExpire(decoded.exp);
          navigate(`/chatapp/messages/${nickName}`);
        }
      })
      .catch((error) => {
        setIsError(true);
        console.log("Failed auth", error.message);
      });
  };

  const handleEnterSubmit = (event) => {
    if (event.key !== "Enter") return;
    handleSubmit();
  };

  return (
    <div className="login-page-container">
      <div className="login-page-inner-container">
        <span className="login-page-header">
          <div>Login to your account</div>
          <div>Thank you for get back to our chat community</div>
        </span>
        <div className="login-page-form">
          <InputWithoutBorder
            testId="login-page-nickName"
            id="login-page-nickname"
            value={nickName}
            onChange={setNickname}
            onKeyDown={handleEnterSubmit}
            labelText="Enter nickname"
          />
          <InputWithoutBorder
            testId="login-page-password"
            id="login-page-password"
            value={password}
            onChange={setPassword}
            onKeyDown={handleEnterSubmit}
            labelText="Enter password"
            type="password"
          />
          <button className="login-page-login-button" onClick={handleSubmit}>
            Sign in
          </button>
          <div className="position-relative">
            <span className="login-page-register-redirection">
              <span className="login-page-create-text">
                Don{"'"}t have an account yet?
              </span>
              <button
                onClick={() => navigate("/chatapp/register")}
                className="login-page-register-button"
              >
                Join our chat community
              </button>
            </span>
            {isError && (
              <div className="login-page-error-message">
                Incorrect nickname or password
              </div>
            )}
          </div>
        </div>
      </div>
      <img
        src={LoginPageImageBackground}
        alt="login-img"
        className="login-page-image-background"
      />
    </div>
  );
};

export default LoginPage;
