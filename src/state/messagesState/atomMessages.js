import { atom } from "recoil";

export const allMessages = atom({
  key: "allMessages",
  default: [],
});

export const unreadMessages = atom({
  key: "unreadMessages",
  default: [],
});
