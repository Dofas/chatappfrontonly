import React, { useEffect, useState } from "react";
import { useClickOutside } from "../../../../utils/hooks/useClickOutside";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  activeChannel,
  allTeams,
} from "../../../../state/activeChannelState/atomActiveChannelState";
import { UserService } from "../../../../utils/UserService/UserService";
import { activeUserInfo } from "../../../../state/activeUserState/selectorActiveUser";
import {
  allMessages,
  unreadMessages,
} from "../../../../state/messagesState/atomMessages";
import classNames from "classnames";
import jwt_decode from "jwt-decode";
import { isSelectedUserInfoState } from "../../../../state/selectedUserState/atomSelectedUserState";
import { useCalculateWindowSize } from "../../../../utils/hooks/useCalculateWindowSize";
import useRole from "../../../../utils/hooks/useRole";

const UserListContentItem = ({ user, chosenUser, setChosenUser, socket }) => {
  const [isSettings, setIsSettings] = useState(false);
  const channel = useRecoilValue(activeChannel);
  const activeUser = useRecoilValue(activeUserInfo);
  const closeSettingsModal = () => setIsSettings(false);
  const triggerSettingsModal = () => setIsSettings(!isSettings);
  const messages = useRecoilValue(allMessages);
  const [message, setMessage] = useState({ text: "", time: "" });
  const [status, setStatus] = useState(undefined);
  const allTeamsList = useRecoilValue(allTeams);
  const [allUnreadMessages, setAllUnreadMessages] =
    useRecoilState(unreadMessages);
  const setIsSelectedUserInfoState = useSetRecoilState(isSelectedUserInfoState);
  const { innerWidth } = useCalculateWindowSize();
  const { isManager } = useRole();

  const ref = useClickOutside(closeSettingsModal);
  const onSettingClick = (e) => {
    e.stopPropagation();
    triggerSettingsModal();
  };

  const onDeleteUserClick = async (e, userToDelete) => {
    e.stopPropagation();
    const newUsers = channel.users.filter(
      (user) => user !== userToDelete.nickName
    );
    if (!localStorage.getItem("auth")) {
      window.location.replace("/chatapp/login");
    }
    const decoded = jwt_decode(localStorage.getItem("auth"));
    const currentDate = new Date();
    if (decoded.exp * 1000 < currentDate.getTime()) {
      await UserService.getRefreshToken();
    }
    await UserService.updateTeam(channel.name, { users: newUsers });

    let newTeams = [];
    if (newUsers.length === 0) {
      newTeams = allTeamsList.filter((team) => team.name !== channel.name);
    }

    if (newUsers.length !== 0) {
      newTeams = allTeamsList?.map((team) => {
        if (team.name === channel.name) {
          return { ...team, users: newUsers };
        }
        return team;
      });
    }
    await socket.current.emit("delete-team-user", {
      teams: newTeams,
      name: channel.name,
      isEmptyUsers: newUsers.length === 0,

      nickNameToTDelete: userToDelete.nickName,
    });
    closeSettingsModal();
  };

  useEffect(() => {
    if (!user?.id || !activeUser?.id) return;
    (async () => {
      if (!localStorage.getItem("auth")) {
        window.location.replace("/chatapp/login");
      }
      const decoded = jwt_decode(localStorage.getItem("auth"));
      const currentDate = new Date();
      if (decoded.exp * 1000 < currentDate.getTime()) {
        await UserService.getRefreshToken();
      }
      UserService.getLastMessage({ from: activeUser.id, to: user.id })
        .then((messageResp) => {
          setMessage({
            text: messageResp?.message?.text,
            time: messageResp?.message?.sendTime,
          });
        })
        .catch((error) =>
          console.log(`Error while loading last messages ${error.message}`)
        );

      UserService.getUnreadMessages({ from: activeUser.id, to: user.id })
        .then((messageResp) => {
          if (messageResp?.messagesCount) {
            if (!allUnreadMessages.some((element) => element.id === user.id)) {
              setAllUnreadMessages((prev) =>
                [
                  ...prev,
                  { count: messageResp?.messagesCount, id: messageResp?.id },
                ].filter((v, i, a) => a.findIndex((v2) => v2.id === v.id) === i)
              );
            }
          }
        })
        .catch((error) =>
          console.log(`Error while loading last messages ${error.message}`)
        );
    })();
  }, []);

  useEffect(() => {
    if (!user?.id) return;
    (async () => {
      if (!localStorage.getItem("auth")) {
        window.location.replace("/chatapp/login");
      }
      const decoded = jwt_decode(localStorage.getItem("auth"));
      const currentDate = new Date();

      if (decoded.exp * 1000 < currentDate.getTime()) {
        await UserService.getRefreshToken();
      }
      UserService.getStatus(user.id)
        .then((statusResp) => {
          setStatus(statusResp.status);
        })
        .catch((error) =>
          console.log(`Error while loading user status ${error.message}`)
        );
    })();
  }, [user]);

  useEffect(() => {
    (async () => {
      if (socket.current) {
        socket.current.on("msg-receive", async (newMessage) => {
          if (newMessage.from === user.nickName) {
            setMessage({
              text: newMessage.message.text,
              time: newMessage.message.sendTime,
            });
          }
          if (newMessage.from !== chosenUser.id) {
            const restUsersInUnreadMessages = allUnreadMessages.filter(
              (elem) => elem.id !== newMessage.from
            );
            const userInUnreadMessages = allUnreadMessages.find(
              (elem) => elem.id === newMessage.from
            );
            if (!userInUnreadMessages) {
              setAllUnreadMessages([
                ...allUnreadMessages,
                { count: 1, id: newMessage.from },
              ]);
            } else {
              setAllUnreadMessages([
                ...restUsersInUnreadMessages,
                {
                  id: userInUnreadMessages.id,
                  count: userInUnreadMessages.count + 1,
                },
              ]);
            }
          }
          if (newMessage.from === chosenUser?.id) {
            const users = { from: newMessage.from, to: chosenUser.id };
            if (!localStorage.getItem("auth")) {
              window.location.replace("/chatapp/login");
            }
            const decoded = jwt_decode(localStorage.getItem("auth"));
            const currentDate = new Date();
            if (decoded.exp * 1000 < currentDate.getTime()) {
              await UserService.getRefreshToken();
            }
            UserService.updateReadStatus(users).catch((error) => {
              console.log(`Error while loading messages ${error.message}`);
            });
            const restUsersInUnreadMessages = allUnreadMessages.filter(
              (elem) => elem.id !== newMessage.from
            );
            setAllUnreadMessages(restUsersInUnreadMessages);
          }
        });
        socket.current.on("upd-status", (newStatus) => {
          if (newStatus.nickName === user.nickName) {
            setStatus(newStatus.status);
          }
        });
      }
    })();
  }, [
    socket.current,
    activeUser,
    user,
    allUnreadMessages,
    chosenUser,
    setStatus,
  ]);

  useEffect(() => {
    if (user?.nickName === chosenUser?.id) {
      if (messages?.length) {
        const lastMessage = messages.at(-1);
        setMessage({
          text: lastMessage.message.text,
          time: lastMessage.message.sendTime,
        });
      }
    }
  }, [messages]);

  function setUserInfo() {
    if (innerWidth <= 1330) {
      return;
    }
    return setIsSelectedUserInfoState((prev) => !prev);
  }

  return (
    <div
      className={classNames("user-list-team-user", {
        "user-list-active-team-user": chosenUser?.id === user.id,
      })}
      onClick={(e) => {
        setChosenUser(e, user);
        const userToClear = allUnreadMessages.find(
          (element) => element.id === user.id
        );
        if (userToClear) {
          const prevUsers = allUnreadMessages.filter(
            (element) => element.id !== user.id
          );
          setAllUnreadMessages([...prevUsers]);
        }
      }}
    >
      <div className="user-list-full-info">
        <div className="user-list-full-info-avatar">
          <img
            className="user-list-team-user-avatar"
            onClick={setUserInfo}
            src={process.env.REACT_APP_API_URL + "/" + user.avatar}
            alt="avatar"
          />
          <div
            className={
              status === "online"
                ? "on status"
                : status === "busy"
                ? "busy status"
                : "off status"
            }
          />
          {allUnreadMessages.find((element) => element.id === user.id) && (
            <div className="user-list-unread-messages-count">
              {
                allUnreadMessages.find((element) => element.id === user.id)
                  ?.count
              }
            </div>
          )}
        </div>
        <div className="info">
          <div
            title={user.firstName + " " + user.lastName}
            className="info-name"
          >
            {user.firstName + " " + user.lastName}
          </div>
          <div className="user-list-team-user-time">{message?.time}</div>
        </div>
      </div>
      <div className="user-list-team-user-info">
        {isManager && (
          <div className="user-list-team-user-name">
            <div
              onClick={onSettingClick}
              className="position-relative"
              ref={ref}
              data-testid="delete-user-from-team"
            >
              <div className="dot delete-action" />
              <div className="dot delete-action" />
              <div className="dot delete-action" />
              {isSettings && (
                <ul className="user-list-item-setting">
                  <li onClick={(e) => onDeleteUserClick(e, user)}>
                    delete user
                  </li>
                </ul>
              )}
            </div>
          </div>
        )}
        <div className="user-list-team-user-messages">
          <div>{message?.text}</div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(UserListContentItem);
