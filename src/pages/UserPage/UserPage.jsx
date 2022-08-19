import { useEffect } from "react";
import "./user-page.css";
import Header from "../../components/page-components/HeaderComponent/Header";
import { useParams } from "react-router-dom";
import { useAuth } from "../../utils/hooks/useAuth";
import Spinner from "../../components/ui-components/SpinnerComponent/Spinner";
import { useSetRecoilState } from "recoil";
import { activeUser } from "../../state/activeUserState/atomActiveUser";
import ChannelList from "../../components/page-components/ChannelsListComponent/ChannelList";
import UserList from "../../components/page-components/UserListComponent/UserList";
import SelectedUser from "../../components/page-components/SelectedUserComponent/SelectedUser";
import Chat from "../../components/page-components/ChatComponent/Chat";

const UserPage = ({ activeLink }) => {
  const { id } = useParams();

  const setActiveUser = useSetRecoilState(activeUser);

  const { user, isLoading, isError } = useAuth(id);

  useEffect(() => {
    if (user && !isError) {
      setActiveUser(user);
    } else {
      setActiveUser("");
    }
    //eslint-disable-next-line
  }, [user, isError]);

  const userContent = user?.id ? (
    <>
      <Header activeLink={activeLink} />
      <div
        className="user-page-content"
        data-testid="user-page-content-data-id"
      >
        <ChannelList />
        <UserList />
        <SelectedUser />
        <Chat />
      </div>
    </>
  ) : (
    <div className="user-page-load-error">User doesnt exist</div>
  );

  return isLoading ? <Spinner /> : userContent;
};

export default UserPage;
