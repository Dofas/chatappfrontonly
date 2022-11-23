import "./active-user.css";
import Star from "../../../assets/images/star.jpg";
import Bell from "../../../assets/images/bell.jpg";
import Question from "../../../assets/images/question.jpg";
import Globe from "../../../assets/images/globe.jpg";
import { useState } from "react";
import { useClickOutside } from "../../../utils/hooks/useClickOutside";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { activeUserInfo } from "../../../state/activeUserState/selectorActiveUser";

const ActiveUser = ({
  notificationsCount,
  messagesCount,
  userName,
  userAvatar,
  socket,
}) => {
  const [isMenu, setIsMenu] = useState(false);
  const closeMenu = () => setIsMenu(false);
  const triggerMenu = () => setIsMenu(!isMenu);
  const activeUser = useRecoilValue(activeUserInfo);
  const menuRef = useClickOutside(closeMenu);
  const navigate = useNavigate();

  const onMenuClick = (e) => {
    e.stopPropagation();
    triggerMenu();
  };

  const exitHandler = async (e) => {
    e.stopPropagation();
    socket.current.emit("change-status", {
      nickName: activeUser.id,
      status: "offline",
    });
    localStorage.removeItem("auth");
    navigate("/chatapp/login");
  };

  return (
    <div className="active-user-info-container">
      <ul>
        <li>
          {!!notificationsCount && (
            <span
              data-testid="active-user-notification-count"
              className="circle color-red"
            >
              {notificationsCount}
            </span>
          )}
          <img src={Star} alt="star" />
        </li>
        <li>
          {!!messagesCount && (
            <span
              data-testid="active-user-messages-count"
              className="circle color-green"
            >
              {messagesCount}
            </span>
          )}
          <img src={Bell} alt="bell" />
        </li>
        <li>
          <img src={Question} alt="question" />
        </li>
        <li>
          <img src={Globe} alt="globe" />
        </li>
      </ul>
      <div
        className="active-user-info-block"
        onClick={onMenuClick}
        ref={menuRef}
      >
        <div title={userName}>{userName}</div>
        <img
          src={userAvatar && process.env.REACT_APP_API_URL + "/" + userAvatar}
          alt="active-avatar"
        />
        {isMenu && (
          <div className="header-menu-exit" onClick={exitHandler}>
            Exit
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveUser;
