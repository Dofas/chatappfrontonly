import { atom } from "recoil";

export const usersList = atom({
  key: "usersList",
  default: "",
});

export const userListMenuOption = atom({
  key: "userListMenuOption",
  default: "all",
});

export const userSearchValue = atom({
  key: "userSearchValue",
  default: "",
});
