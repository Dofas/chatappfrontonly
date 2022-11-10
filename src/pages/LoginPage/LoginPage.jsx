import React, { useState } from "react";
import "./login-page.css";
import { useNavigate } from "react-router-dom";
import { UserService } from "../../utils/UserService/UserService";

const LoginPage = ({ socket }) => {
  const [nickName, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
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

  return (
    <div className="login-page-container">
      <div>
        <div>Enter nickname:</div>
        <input
          data-testid="login-page-nickName"
          value={nickName}
          onChange={(e) => setNickname(e.target.value)}
        />
      </div>
      <div>
        <div>Enter password:</div>
        <input
          type="password"
          data-testid="login-page-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleSubmit}>Login</button>
      <span style={{ color: "green", fontSize: 22, marginTop: 30 }}>
        Create account
      </span>
      <button onClick={() => navigate("/chatapp/register")}>Register</button>
      {isError && (
        <div style={{ color: "red", fontSize: 15 }}>
          Incorrect nickname or password
        </div>
      )}
    </div>
  );
};

export default LoginPage;
