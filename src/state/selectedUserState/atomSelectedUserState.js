import { atom } from "recoil";

export const selectedUserState = atom({
  key: "selectedUserState",
  default: "",
});

export const isSelectedUserInfoState = atom({
  key: "isSelectedUserInfoState",
  default: false,
});
