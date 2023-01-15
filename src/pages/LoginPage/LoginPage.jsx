import React, { useState } from "react";
import "./login-page.scss";
import { useNavigate } from "react-router-dom";
import { UserService } from "../../utils/UserService/UserService";

const LoginPage = ({ socket }) => {
  const [nickName, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!nickName || !password) {
      setIsError(true);
      return;
    }
    const data = { nickName, password };
    UserService.loginUser(data)
      .then((data) => {
        if (data.status) {
          socket.current.emit("change-status", {
            nickName,
            status: "online",
          });
          localStorage.setItem(nickName.toString(), "auth");
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
          <div className="input-container-text-only">
            <input
              data-testid="login-page-nickName"
              id="login-page-nickname"
              placeholder="&nbsp;"
              value={nickName}
              onChange={(event) => setNickname(event.target.value)}
              onKeyDown={handleEnterSubmit}
            />
            <label htmlFor="login-page-nickname">Enter nickname</label>
          </div>
          <div className="input-container-text-only">
            <input
              type="password"
              id="login-page-password"
              data-testid="login-page-password"
              placeholder="&nbsp;"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              onKeyDown={handleEnterSubmit}
            />
            <label htmlFor="login-page-password">Enter password</label>
          </div>
          <button className="login-page-login-button" onClick={handleSubmit}>
            Sign in
          </button>
          <span>
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
  );
};

export default LoginPage;
