import React from "react";
import { useRecoilState } from "recoil";
import { userListMenuOption } from "../../../../state/activeUserListState/atomActiveUserListState";

const messagesOption = [
  { key: "all", title: "All messages" },
  { key: "unread", title: "Unread" },
  { key: "notification", title: "Important" },
];

const Menu = () => {
  const [activeOption, setActiveOption] = useRecoilState(userListMenuOption);
  return (
    <ul className="user-list-menu">
      {messagesOption.map((option) => (
        <li
          className={
            activeOption === option.key ? "user-list-menu-selected-option" : ""
          }
          key={option.key}
          onClick={() => setActiveOption(option.key)}
        >
          {option.title}
        </li>
      ))}
    </ul>
  );
};

export default Menu;
