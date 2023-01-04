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
      <div>
        <div>Enter nickname:</div>
        <input
          data-testid="login-page-nickName"
          value={nickName}
          onChange={(event) => setNickname(event.target.value)}
          onKeyDown={handleEnterSubmit}
        />
      </div>
      <div>
        <div>Enter password:</div>
        <input
          type="password"
          data-testid="login-page-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          onKeyDown={handleEnterSubmit}
        />
      </div>
      <button className="login-page-login-button" onClick={handleSubmit}>
        Login
      </button>
      <span className="login-page-create-text">Create account</span>
      <button onClick={() => navigate("/chatapp/register")}>Register</button>
      {isError && (
        <div className="login-page-error-message">
          Incorrect nickname or password
        </div>
      )}
    </div>
  );
};

export default LoginPage;
