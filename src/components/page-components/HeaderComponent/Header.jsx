import "./header.css";
import { useRecoilValue } from "recoil";
import { activeUserInfo } from "../../../state/activeUserState/selectorActiveUser";
import NavBar from "../../NavBarComponent/NavBar";
import ActiveUser from "../../ActiveUserComponent/ActiveUser";
import { useEffect, useState } from "react";
import { UserService } from "../../../utils/UserService/UserService";

const Header = ({ activeLink }) => {
  const activeUser = useRecoilValue(activeUserInfo);
  const [notifications, setNotifications] = useState({
    notificationsCount: undefined,
    messagesCount: undefined,
  });

  useEffect(() => {
    if (activeUser.id) {
      (async () => {
        const notificationsResponse = await UserService.fetchNotifications(
          activeUser.id
        );

        setNotifications({
          notificationsCount: notificationsResponse.importantNotification,
          messagesCount: notificationsResponse.simpleNotification,
        });
      })();
    }
  }, [activeUser.id]);

  return (
    <header className={"header"}>
      <NavBar activeLink={activeLink} id={activeUser.id} />
      <ActiveUser
        notificationsCount={notifications.notificationsCount}
        messagesCount={notifications.messagesCount}
        userName={activeUser.name}
        userAvatar={activeUser.avatar}
      />
    </header>
  );
};

export default Header;
