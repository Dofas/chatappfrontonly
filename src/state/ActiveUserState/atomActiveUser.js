import { atom } from "recoil";

export const activeUser = atom({
  key: "activeUser",
  default: "",
});
