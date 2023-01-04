import { useEffect, useRef } from "react";
import "./user-page.scss";
import Header from "../../components/page-components/HeaderComponent/Header";
import { useParams } from "react-router-dom";
import { useAuth } from "../../utils/hooks/useAuth";
import Spinner from "../../components/ui-components/SpinnerComponent/Spinner";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { activeUser } from "../../state/activeUserState/atomActiveUser";
import ChannelList from "../../components/page-components/ChannelsListComponent/ChannelList";
import UserList from "../../components/page-components/UserListComponent/UserList";
import SelectedUser from "../../components/page-components/SelectedUserComponent/SelectedUser";
import Chat from "../../components/page-components/ChatComponent/Chat";
import { allUsers } from "../../state/activeChannelState/atomActiveChannelState";
import { activeUserInfo } from "../../state/activeUserState/selectorActiveUser";
import { UserService } from "../../utils/UserService/UserService";

const UserPage = ({ activeLink, socket }) => {
  const { id } = useParams();

  const setActiveUser = useSetRecoilState(activeUser);
  const [users, setAllUsers] = useRecoilState(allUsers);

  const { user, isLoading, isError } = useAuth(id);

  const activeUserInfoState = useRecoilValue(activeUserInfo);

  const isFirstRender = useRef(null);

  useEffect(() => {
    if (socket.current) {
      if (activeUserInfoState?.id) {
        if (!isFirstRender.current) {
          socket.current.emit("add-user", activeUserInfoState.id);
          UserService.updateStatus(activeUserInfoState.id, {
            status: "online",
          });
          socket.current.emit("change-status", {
            nickName: activeUserInfoState.id,
            status: "online",
          });
          isFirstRender.current = true;
        }
      }
    }
  }, [socket.current, activeUserInfoState]);

  useEffect(() => {
    if (user && !isError) {
      setActiveUser(user);
    } else {
      setActiveUser("");
    }
    //eslint-disable-next-line
  }, [user, isError]);

  useEffect(() => {
    if (!setAllUsers) return;
    UserService.getAllUsers()
      .then((data) => {
        const usersWIthChecked = data?.map((user) => ({
          ...user,
          checked: false,
        }));
        setAllUsers(usersWIthChecked);
      })
      .catch((e) => {
        console.log(`Error while loading all users ${e.message}`);
        setAllUsers("");
      });
  }, [setAllUsers]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("upd-register-users", (newUser) => {
        if (users.length) {
          const newUsers = [...users, newUser];
          setAllUsers(newUsers);
        }
      });
    }
  }, [socket.current, users]);

  const userContent = user?.id ? (
    <>
      <Header activeLink={activeLink} socket={socket} />
      <div
        className="user-page-content"
        data-testid="user-page-content-data-id"
      >
        <ChannelList socket={socket} />
        <UserList socket={socket} />
        <SelectedUser />
        <Chat socket={socket} />
      </div>
    </>
  ) : (
    <div className="user-page-load-error">User doesnt exist</div>
  );

  return localStorage.getItem(user?.id) !== "auth" ? (
    <div>You need to sign in</div>
  ) : isLoading ? (
    <Spinner />
  ) : (
    userContent
  );
};

export default UserPage;
