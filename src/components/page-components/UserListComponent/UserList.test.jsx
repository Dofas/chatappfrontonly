import { UserService } from "../../../utils/UserService/UserService";
import { render, screen, act } from "@testing-library/react";
import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";
import UserList from "./UserList";
import {
  activeChannel,
  allTeams,
} from "../../../state/activeChannelState/atomActiveChannelState";
import { useEffect } from "react";
import { activeUser } from "../../../state/activeUserState/atomActiveUser";
import userEvent from "@testing-library/user-event";
import MockedSocket from "socket.io-mock";

jest.mock("../../../utils/UserService/UserService");

const activeUserState = {
  id: "someId",
  firstName: "firstName",
  lastName: "lastName",
};

const activeTeamMock = {
  id: "someTeam",
  name: "someTeam",
  users: ["Nickname", "Nickname2", "Nickname3"],
};

const mockUsers = [
  {
    avatar: "0191a31b-6958-40c5-b58b-6c9b7025c767.jpg",
    dateOfBirthday: "March 1 2020",
    email: "email@gmail.com",
    firstName: "First Name",
    gender: "Male",
    id: "Nickname",
    languages: ["First Second"],
    lastName: "Last Name",
    location: "Some Address",
    nickName: "NickName",
    number: "+38-222-222-2222",
    status: "online",
  },
  {
    avatar: "0191a31b-6958-40c5-b58b-6c9b7025c767.jpg",
    dateOfBirthday: "March 1 2020",
    email: "email@gmail.com",
    firstName: "First Name2",
    gender: "Male",
    id: "Nickname2",
    languages: ["First Second"],
    lastName: "Last Name2",
    location: "Some Address",
    nickName: "Nickname2",
    number: "+38-222-222-2222",
    status: "offline",
  },
  {
    avatar: "0191a31b-6958-40c5-b58b-6c9b7025c767.jpg",
    dateOfBirthday: "March 1 2020",
    email: "email@gmail.com",
    firstName: "First Name3",
    gender: "Male",
    id: "Nickname3",
    languages: ["First Second"],
    lastName: "Last Name3",
    location: "Some Address",
    nickName: "Nickname3",
    number: "+38-222-222-2222",
    status: "offline",
  },
];

const messageMock = {
  isRead: false,
  message: { file: null, sendTime: "21:20am", text: "some text" },
  sender: "Nickname",
  users: ["Nickname", "Nickname2"],
};

const UserListWithState = ({ user, channel }) => {
  const setActiveTeam = useSetRecoilState(activeChannel);
  const setActiveUser = useSetRecoilState(activeUser);
  const setAllTeamsList = useSetRecoilState(allTeams);
  let socketMock = new MockedSocket();
  useEffect(() => {
    setActiveUser(user);
    setActiveTeam(channel);
    setAllTeamsList([activeTeamMock]);
  }, []);
  return (
    <UserList
      socket={{
        current: socketMock.socketClient,
      }}
    />
  );
};

describe("User list tests", () => {
  describe("With existed mock data", () => {
    let updateUserMock;
    let updateREadStatusMock;
    beforeEach(async () => {
      const mockedUserService = jest.mocked(UserService);
      updateUserMock = jest.mocked(UserService.updateTeam);
      updateREadStatusMock = jest.mocked(UserService.updateReadStatus);
      mockedUserService.findUser
        .mockResolvedValueOnce(mockUsers[0])
        .mockResolvedValueOnce(mockUsers[1])
        .mockResolvedValueOnce(mockUsers[2])
        .mockResolvedValueOnce(mockUsers[0])
        .mockResolvedValueOnce(mockUsers[1])
        .mockResolvedValueOnce(mockUsers[2]);
      mockedUserService.getLastMessage.mockResolvedValue(messageMock);
      updateREadStatusMock.mockResolvedValue({});
      mockedUserService.getStatus.mockResolvedValue({ status: "online" });
      mockedUserService.getUnreadMessages
        .mockResolvedValueOnce({
          messagesCount: 2,
          id: "Nickname3",
        })
        .mockResolvedValue({});
      await act(() => {
        render(
          <UserListWithState user={activeUserState} channel={activeTeamMock} />,
          { wrapper: RecoilRoot }
        );
      });
    });

    test("should search users when typed searching value", async () => {
      const searchPlaceholder = await screen.findByText("List of someTeam");
      expect(
        await screen.findByText("First Name Last Name")
      ).toBeInTheDocument();
      expect(
        await screen.findByText("First Name2 Last Name2")
      ).toBeInTheDocument();
      expect(
        await screen.findByText("First Name3 Last Name3")
      ).toBeInTheDocument();
      await act(async () => userEvent.click(searchPlaceholder));
      const searchInput = await screen.findByTestId("user-list-search-input");
      await act(async () => userEvent.type(searchInput, "First Name3"));
      expect(
        await screen.queryByText("First Name2 Last Name2")
      ).not.toBeInTheDocument();
      expect(
        await screen.queryByText("First Name Last Name")
      ).not.toBeInTheDocument();
      expect(
        await screen.findByText("First Name3 Last Name3")
      ).toBeInTheDocument();
      expect(await screen.findByText("some text")).toBeInTheDocument();
      expect(await screen.findByText("21:20am")).toBeInTheDocument();
    });

    test("should set all options by default and be able to change menu option and render correct users", async () => {
      const allOption = await screen.findByText("All messages");
      const unreadOption = await screen.findByText("Unread");
      const importantOption = await screen.findByText("Important");

      expect(allOption).toHaveClass("user-list-menu-selected-option");
      expect(unreadOption).not.toHaveClass("user-list-menu-selected-option");
      expect(importantOption).not.toHaveClass("user-list-menu-selected-option");
      expect(
        await screen.findByText("First Name Last Name")
      ).toBeInTheDocument();
      expect(
        await screen.findByText("First Name2 Last Name2")
      ).toBeInTheDocument();
      expect(
        await screen.findByText("First Name3 Last Name3")
      ).toBeInTheDocument();

      await act(async () => userEvent.click(unreadOption));
      expect(
        screen.queryByText("First Name2 Last Name2")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("First Name Last Name")
      ).not.toBeInTheDocument();
      expect(
        await screen.findByText("First Name3 Last Name3")
      ).toBeInTheDocument();
      expect(allOption).not.toHaveClass("user-list-menu-selected-option");
      expect(unreadOption).toHaveClass("user-list-menu-selected-option");
      expect(importantOption).not.toHaveClass("user-list-menu-selected-option");

      await act(async () => userEvent.click(importantOption));
      expect(
        screen.queryByText("First Name Last Name")
      ).not.toBeInTheDocument();
      expect(
        await screen.queryByText("First Name2 Last Name2")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("First Name3 Last Name3")
      ).not.toBeInTheDocument();
      expect(allOption).not.toHaveClass("user-list-menu-selected-option");
      expect(unreadOption).not.toHaveClass("user-list-menu-selected-option");
      expect(importantOption).toHaveClass("user-list-menu-selected-option");
    });

    test("should delete user on 'delete' button", async () => {
      const deleteButton = await screen.findAllByTestId(
        "delete-user-from-team"
      );
      await act(async () => await userEvent.click(deleteButton[0]));
      await act(
        async () =>
          await userEvent.click(await screen.findByText("delete user"))
      );
      expect(updateUserMock).toHaveBeenCalledWith("someTeam", {
        users: ["Nickname", "Nickname2", "Nickname3"],
      });
    });

    test("should set all options by default and be able to change menu option and render correct users", async () => {
      const unreadOption = await screen.findByText("Unread");
      await userEvent.click(await screen.findByText("First Name3 Last Name3"));

      await act(async () => userEvent.click(unreadOption));
      expect(
        screen.queryByText("First Name2 Last Name2")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("First Name Last Name")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("First Name3 Last Name3")
      ).not.toBeInTheDocument();
    });
  });

  describe("With empty mock response", () => {
    test("should show correct text if members doesnt exists in team", async () => {
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
