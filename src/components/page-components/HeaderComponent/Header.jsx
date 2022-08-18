import "./header.css";
import { useRecoilValue } from "recoil";
import { activeUserInfo } from "../../../state/activeUserState/selectorActiveUser";
import NavBar from "../../ui-components/NavBarComponent/NavBar";
import ActiveUser from "../../ui-components/ActiveUserComponent/ActiveUser";
import { useEffect, useState } from "react";
import { UserService } from "../../../utils/UserService/UserService";

const Header = ({ activeLink }) => {
  const activeUser = useRecoilValue(activeUserInfo);
  const [notifications, setNotifications] = useState({
    notificationsCount: undefined,
    messagesCount: undefined,
  });

  useEffect(() => {
    if (!activeUser.id) return;

    try {
      (async () => {
        const notificationsResponse = await UserService.fetchNotifications(
          activeUser.id
        );
        setNotifications({
          notificationsCount: notificationsResponse?.importantNotification,
          messagesCount: notificationsResponse?.simpleNotification,
        });
      })();
    } catch (e) {
      console.log(`Error while loading notifications ${e.message}`);
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
