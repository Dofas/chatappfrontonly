import { atom, selector } from "recoil";
import { selectedUserState } from "../selectedUserState/atomSelectedUserState";

export const chatWindowState = atom({
  key: "chatWindowState",
  default: selector({
    key: "chatWindowState/Default",
    get: ({ get }) => {
      const isSelectedUser = get(selectedUserState);
      return !!isSelectedUser;
    },
  }),
});
