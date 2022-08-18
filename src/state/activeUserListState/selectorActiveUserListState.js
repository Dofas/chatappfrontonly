import { selector } from "recoil";
import {
  userListMenuOption,
  userSearchValue,
  usersList,
} from "./atomActiveUserListState";

export const filteredUserList = selector({
  key: "filteredUserList",
  get: ({ get }) => {
    const userList = get(usersList);
    const menuOption = get(userListMenuOption);
    const searchingValue = get(userSearchValue);
    const filteredUsersAndMessages =
      userList &&
      userList
        .filter((item) => !!item)
        .filter((item) =>
          menuOption === "unread"
            ? item.status === "unread"
            : menuOption === "notification"
            ? item.type === "notification"
            : item
        )
        .filter((item) =>
          item.senderName
            .trim()
            .toLowerCase()
            .includes(searchingValue.trim().toLowerCase())
        );
    return filteredUsersAndMessages ?? [];
  },
});
