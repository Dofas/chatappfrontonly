import "./app.css";
import AppRoutes from "../../../routes/AppRoutes";
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

function App() {
  const socket = useRef(null);
  useEffect(() => {
    socket.current = io(process.env.REACT_APP_API_URL);
  }, []);
  return (
    <div className="styles-container">
      <AppRoutes socket={socket} />
    </div>
  );
}

export default App;
