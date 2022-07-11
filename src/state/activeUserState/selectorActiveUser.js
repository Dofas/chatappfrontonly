import { selector } from "recoil";
import { activeUser } from "./atomActiveUser";

export const activeUserInfo = selector({
  key: "activeUserInfo",
  get: ({ get }) => {
    const userInfo = get(activeUser);
    return {
      id: userInfo.id,
      name: `${userInfo.firstName} ${userInfo.lastName}`,
      avatar: userInfo.avatar,
    };
  },
});
