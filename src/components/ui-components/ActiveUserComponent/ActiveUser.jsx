import "./active-user.scss";
import Star from "../../../assets/images/star.svg";
import Bell from "../../../assets/images/bell.svg";
import Question from "../../../assets/images/question.svg";
import Globe from "../../../assets/images/globe.svg";
import { useState } from "react";
import { useClickOutside } from "../../../utils/hooks/useClickOutside";
import { useRecoilValue } from "recoil";
import { activeUserInfo } from "../../../state/activeUserState/selectorActiveUser";
import { UserService } from "../../../utils/UserService/UserService";

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

  const onMenuClick = (e) => {
    e.stopPropagation();
    triggerMenu();
  };

  const exitHandler = async (e) => {
    e.stopPropagation();
    await UserService.logOutUser();
    socket.current.emit("change-status", {
      nickName: activeUser.id,
      status: "offline",
    });
    localStorage.removeItem("auth");
    window.location.replace("/chatapp/login");
  };

  return (
    <div className="active-user-info-container">
      <ul className="active-user-pictures-list">
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
          <img
            src={Question}
            alt="question"
            className="header-question-image"
          />
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
        {userAvatar && (
          <img
            src={process.env.REACT_APP_API_URL + "/" + userAvatar}
            alt="active-avatar"
          />
        )}
        {isMenu && (
          <ul className="header-menu-dropdown">
            <li onClick={exitHandler}>Exit</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default ActiveUser;
