import { selector } from "recoil";
import { activeUser } from "./atomActiveUser";

export const activeUserInfo = selector({
  key: "activeUserInfo",
  get: ({ get }) => {
    const userInfo = get(activeUser);
    return userInfo;
  },
});
