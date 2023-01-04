import "./header.scss";
import { useRecoilValue } from "recoil";
import { activeUserInfo } from "../../../state/activeUserState/selectorActiveUser";
import NavBar from "../../ui-components/NavBarComponent/NavBar";
import ActiveUser from "../../ui-components/ActiveUserComponent/ActiveUser";
import { unreadMessages } from "../../../state/messagesState/atomMessages";

const Header = ({ activeLink, socket }) => {
  const activeUser = useRecoilValue(activeUserInfo);
  const allUnread = useRecoilValue(unreadMessages);

  const unique = allUnread
    .map((elem) => elem.count)
    .reduce((previousValue, currentValue) => previousValue + currentValue, 0);

  return (
    <header className="header">
      <NavBar activeLink={activeLink} id={activeUser.id} />
      <ActiveUser
        notificationsCount={undefined}
        messagesCount={unique}
        userName={activeUser.name}
        userAvatar={activeUser.avatar}
        socket={socket}
      />
    </header>
  );
};

export default Header;
