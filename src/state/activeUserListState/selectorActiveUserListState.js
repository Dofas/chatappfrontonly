import { selector } from "recoil";
import {
  userListMenuOption,
  userSearchValue,
  usersList,
} from "./atomActiveUserListState";
import { unreadMessages } from "../messagesState/atomMessages";

export const filteredUserList = selector({
  key: "filteredUserList",
  get: ({ get }) => {
    const userList = get(usersList);
    const menuOption = get(userListMenuOption);
    const searchingValue = get(userSearchValue);
    const allUnreadMessages = get(unreadMessages);
    const filteredUsersAndMessages =
      userList &&
      userList
        .filter((item) => !!item)
        .filter((item) => {
          return menuOption === "unread"
            ? allUnreadMessages.some((msg) => item.id === msg.id) && item
            : menuOption === "notification"
            ? item.type === "notification"
            : item;
        })
        .filter((item) => {
          const fullName = item.firstName.concat(item.lastName);
          return fullName
            .trim()
            .toLowerCase()
            .includes(searchingValue.trim().toLowerCase());
        });
    return filteredUsersAndMessages ?? [];
  },
});
