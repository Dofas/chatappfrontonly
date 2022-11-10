import { render, act, screen } from "@testing-library/react";
import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import UserListHeader from "./UserListHeader";
import { activeChannel } from "../../../state/activeChannelState/atomActiveChannelState";
import {
  userListMenuOption,
  userSearchValue,
} from "../../../state/activeUserListState/atomActiveUserListState";
import userEvent from "@testing-library/user-event";

const UserListHeaderWithState = ({ onSearch, onChangeMenuOption }) => {
  const setTeamName = useSetRecoilState(activeChannel);
  const searchValue = useRecoilValue(userSearchValue);
  const activeOption = useRecoilValue(userListMenuOption);
  useEffect(() => {
    setTeamName("someTeamName");
  }, []);
  useEffect(() => {
    onSearch(searchValue);
  }, [searchValue]);
  useEffect(() => {
    onChangeMenuOption(activeOption);
  }, [activeOption]);
  return <UserListHeader />;
};

describe("User list header tests", () => {
  const onSearch = jest.fn();
  const onChangeMenuOption = jest.fn();
  beforeEach(async () => {
    await act(() => {
      render(
        <UserListHeaderWithState
          onSearch={onSearch}
          onChangeMenuOption={onChangeMenuOption}
        />,
        {
          wrapper: RecoilRoot,
        }
      );
    });
  });

  test("should render correct menu and change menu option on click", async () => {
    const allOption = await screen.findByText("All messages");
    const unreadOption = await screen.findByText("Unread");
    const importantOption = await screen.findByText("Important");

    await act(async () => userEvent.click(unreadOption));
    expect(onChangeMenuOption).toHaveBeenCalledWith("unread");

    await act(async () => userEvent.click(importantOption));
    expect(onChangeMenuOption).toHaveBeenCalledWith("notification");

    await act(async () => userEvent.click(allOption));
    expect(onChangeMenuOption).toHaveBeenCalledWith("all");
  });
});
