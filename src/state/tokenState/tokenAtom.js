import { atom } from "recoil";

export const expireState = atom({
  key: "expireState",
  default: false,
});
