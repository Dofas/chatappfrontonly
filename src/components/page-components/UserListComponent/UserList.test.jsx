import { UserService } from "../../../utils/UserService/UserService";
import { render, screen, act } from "@testing-library/react";
import { RecoilRoot, useSetRecoilState } from "recoil";
import UserList from "./UserList";
import { activeChannel } from "../../../state/activeChannelState/atomActiveChannelState";
import { useEffect } from "react";
import {
  mockFirstMessage,
  mockLastMessages,
  mockSecondMessage,
  mockTeamResponse,
  mockThirdMessage,
  mockUser2,
  mockUser3,
  mockUser4,
} from "../../../pages/UserPage/mockData";
import { activeUser } from "../../../state/activeUserState/atomActiveUser";
import userEvent from "@testing-library/user-event";

jest.mock("../../../utils/UserService/UserService");

const activeUserState = {
  id: "someId",
  firstName: "firstName",
  lastName: "lastName",
};

const UserListWithState = ({ user, channel }) => {
  const setActiveTeam = useSetRecoilState(activeChannel);
  const setActiveUser = useSetRecoilState(activeUser);
  useEffect(() => {
    setActiveUser(user);
    setActiveTeam(channel);
  }, []);
  return <UserList />;
};

describe("User list tests", () => {
  describe("With existed mock data", () => {
    beforeEach(async () => {
      const mockedUserService = jest.mocked(UserService);
      mockedUserService.findUser
        .mockResolvedValueOnce(mockUser2)
        .mockResolvedValueOnce(mockUser3)
        .mockResolvedValueOnce(mockUser4);
      mockedUserService.fetchTeamMembers.mockResolvedValue(mockTeamResponse);
      mockedUserService.getLastMessages.mockResolvedValue(mockLastMessages);
      mockedUserService.getMessageInfo
        .mockResolvedValueOnce(mockFirstMessage)
        .mockResolvedValueOnce(mockSecondMessage)
        .mockResolvedValueOnce(mockThirdMessage);

      await act(() => {
        render(
          <UserListWithState user={activeUserState} channel={"someTeam"} />,
          { wrapper: RecoilRoot }
        );
      });
    });
    test("should search users when typed searching value", async () => {
      const searchPlaceholder = await screen.findByText("List of someTeam");
      expect(await screen.findByText("Some User")).toBeInTheDocument();
      expect(await screen.findByText("Rachel Curtis")).toBeInTheDocument();
      expect(await screen.findByText("Aaron Walker")).toBeInTheDocument();
      await act(async () => userEvent.click(searchPlaceholder));
      const searchInput = await screen.findByTestId("user-list-search-input");
      await act(async () => userEvent.type(searchInput, "Rachel"));
      expect(await screen.queryByText("Some User")).not.toBeInTheDocument();
      expect(await screen.queryByText("Aaron Walker")).not.toBeInTheDocument();
      expect(await screen.findByText("Rachel Curtis")).toBeInTheDocument();
    });
    test("should set all options by default and be able to change menu option and render correct users", async () => {
      const allOption = await screen.findByText("All messages");
      const unreadOption = await screen.findByText("Unread messages");
      const importantOption = await screen.findByText("Important");

      expect(allOption).toHaveClass("user-list-menu-selected-option");
      expect(unreadOption).not.toHaveClass("user-list-menu-selected-option");
      expect(importantOption).not.toHaveClass("user-list-menu-selected-option");
      expect(await screen.findByText("Some User")).toBeInTheDocument();
      expect(await screen.findByText("Rachel Curtis")).toBeInTheDocument();
      expect(await screen.findByText("Aaron Walker")).toBeInTheDocument();

      await act(async () => userEvent.click(unreadOption));
      expect(screen.queryByText("Some User")).not.toBeInTheDocument();
      expect(screen.queryByText("Rachel Curtis")).not.toBeInTheDocument();
      expect(await screen.findByText("Aaron Walker")).toBeInTheDocument();
      expect(allOption).not.toHaveClass("user-list-menu-selected-option");
      expect(unreadOption).toHaveClass("user-list-menu-selected-option");
      expect(importantOption).not.toHaveClass("user-list-menu-selected-option");

      await act(async () => userEvent.click(importantOption));
      expect(screen.queryByText("Some User")).not.toBeInTheDocument();
      expect(await screen.findByText("Rachel Curtis")).toBeInTheDocument();
      expect(screen.queryByText("Aaron Walker")).not.toBeInTheDocument();
      expect(allOption).not.toHaveClass("user-list-menu-selected-option");
      expect(unreadOption).not.toHaveClass("user-list-menu-selected-option");
      expect(importantOption).toHaveClass("user-list-menu-selected-option");
    });
  });
  describe("With empty mock response", () => {
    test("should show correct text if members doesnt exists in team", async () => {
      const mockedUserService = jest.mocked(UserService);
      mockedUserService.fetchTeamMembers.mockResolvedValue([]);
      mockedUserService.getLastMessages.mockResolvedValue([]);
      await act(() => {
        render(
          <UserListWithState user={activeUserState} channel={undefined} />,
          {
            wrapper: RecoilRoot,
          }
        );
      });
      expect(
        await screen.findByText("You need some team to see members there")
      ).toBeInTheDocument();
    });
  });
});
