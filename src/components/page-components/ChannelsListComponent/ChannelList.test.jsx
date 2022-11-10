import { UserService } from "../../../utils/UserService/UserService";
import { render, screen, act } from "@testing-library/react";
import ChannelList from "./ChannelList";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { WithActiveUser } from "../HeaderComponent/Header.test";
import userEvent from "@testing-library/user-event";
import MockedSocket from "socket.io-mock";
import { allUsers } from "../../../state/activeChannelState/atomActiveChannelState";
import { useEffect } from "react";

jest.mock("../../../utils/UserService/UserService");

const teamsResponse = [
  { id: "firstTeam", name: "firstTeam", users: ["NickName", "SecondUser"] },
  {
    id: "secondTeam",
    name: "secondTeam",
    users: ["NickName", "SecondUser", "ThirdUser"],
  },
];

const groupsResponse = [
  { id: "firstGroup", name: "firstGroup", users: ["NickName", "ThirdUser"] },
];

export const mockUsers = [
  {
    avatar: "0191a31b-6958-40c5-b58b-6c9b7025c767.jpg",
    checked: false,
    dateOfBirthday: "March 1 2020",
    email: "email@gmail.com",
    firstName: "First Name",
    gender: "Male",
    id: "NickName",
    languages: ["First Second"],
    lastName: "Last Name",
    location: "Some Address",
    nickName: "NickName",
    number: "+38-222-222-2222",
    status: "online",
  },
  {
    avatar: "0191a31b-6958-40c5-b58b-6c9b7025c767.jpg",
    checked: false,
    dateOfBirthday: "March 1 2020",
    email: "email@gmail.com",
    firstName: "Second First Name",
    gender: "Male",
    id: "SecondUser",
    languages: ["First Second"],
    lastName: "Second Last Name",
    location: "Some Address",
    nickName: "SecondUser",
    number: "+38-222-222-2222",
    status: "online",
  },
];

const ChannelListWithUsers = () => {
  let socketMock = new MockedSocket();
  const setUsers = useSetRecoilState(allUsers);
  useEffect(() => {
    setUsers(mockUsers);
  }, []);
  return (
    <WithActiveUser>
      <ChannelList
        socket={{
          current: socketMock.socketClient,
        }}
      />
    </WithActiveUser>
  );
};

describe("Channel list tests", () => {
  describe("With response 200", () => {
    let teamsMock;
    let groupsMock;
    let createTeamMock;
    let createGroupMock;
    beforeEach(async () => {
      teamsMock = jest.mocked(UserService.getTeams);
      groupsMock = jest.mocked(UserService.getGroups);
      createTeamMock = jest.mocked(UserService.createTeam);
      createGroupMock = jest.mocked(UserService.createGroup);
      teamsMock.mockResolvedValue(teamsResponse);
      groupsMock.mockResolvedValue(groupsResponse);
      createTeamMock.mockResolvedValue({ status: true });
      createGroupMock.mockResolvedValue({ status: true });
      await act(async () => {
        await render(<ChannelListWithUsers />, { wrapper: RecoilRoot });
      });
    });

    test("should fetch channels info and load components", async () => {
      expect(await screen.findByText("#firstTeam")).toBeInTheDocument();
      expect(await screen.findByText("#secondTeam")).toBeInTheDocument();
      expect(await screen.findByText("2")).toBeInTheDocument();
      expect(await screen.findByText("3")).toBeInTheDocument();
      expect(await screen.findByText("#firstGroup")).toBeInTheDocument();
    });

    test("should open modal window and create team", async () => {
      const addTeamBtn = await screen.findByTestId("add-team-button");
      await act(async () => userEvent.click(addTeamBtn));
      expect(await screen.findByText("Type team name")).toBeInTheDocument();
      const teamInput = await screen.findByTestId("team-name-input");
      await userEvent.type(teamInput, "someTeam");
      const userCheckboxes = await screen.findAllByTestId(
        "team-name-user-checkbox"
      );
      act(() => userEvent.click(userCheckboxes[0]));
      await act(() => userEvent.click(screen.getByText("Create team")));

      expect(createTeamMock).toHaveBeenCalledWith({
        name: "someTeam",
        users: ["someId", "NickName"],
      });
    });

    test("should open modal window and create group", async () => {
      const addTGroupBtn = await screen.findByTestId("add-group-button");
      await act(async () => userEvent.click(addTGroupBtn));
      expect(await screen.findByText("Type group name")).toBeInTheDocument();
      const groupInput = await screen.findByTestId("group-name-input");
      await userEvent.type(groupInput, "SomeGroup");
      await userEvent.click(await screen.findByText("Save group"));
      const userCheckboxes = await screen.findAllByTestId(
        "group-name-user-checkbox"
      );
      act(() => userEvent.click(userCheckboxes[0]));
      await act(() => userEvent.click(screen.getByText("Save group")));

      expect(createGroupMock).toHaveBeenCalledWith({
        name: "SomeGroup",
        users: ["someId", "NickName"],
      });
    });

    test("should open modal and show error message that group name is not valid", async () => {
      const addTGroupBtn = await screen.findByTestId("add-group-button");
      await act(async () => userEvent.click(addTGroupBtn));
      expect(await screen.findByText("Type group name")).toBeInTheDocument();
      const groupInput = await screen.findByTestId("group-name-input");
      await userEvent.type(groupInput, "%@");
      await userEvent.click(await screen.findByText("Save group"));
      expect(
        await screen.findByText(
          "You can not create group with empty name or use space or spec symbols"
        )
      ).toBeInTheDocument();
      await act(async () =>
        userEvent.click(await screen.findByTestId("close-add-group-modal-btn"))
      );
      expect(screen.queryByText("Type group name")).not.toBeInTheDocument();
    });

    test("should be able to change active team", async () => {
      expect(await screen.findByTitle("firstTeam")).toHaveClass("active-team");
      expect(await screen.findByTitle("secondTeam")).not.toHaveClass(
        "active-team"
      );
      await act(async () =>
        userEvent.click(await screen.findByTitle("secondTeam"))
      );
      expect(await screen.findByTitle("firstTeam")).not.toHaveClass(
        "active-team"
      );
      expect(await screen.findByTitle("secondTeam")).toHaveClass("active-team");
    });
  });

  describe("With error response", () => {
    test("should show correct text if back-end return an error", async () => {
      const mockedUserService = jest.mocked(UserService);
      mockedUserService.getGroups.mockRejectedValue(new Error());
      mockedUserService.getTeams.mockRejectedValue(new Error());
      let socketMock = new MockedSocket();
      await act(() => {
        render(
          <WithActiveUser>
            <ChannelList
              socket={{
                current: socketMock.socketClient,
              }}
            />
          </WithActiveUser>,
          { wrapper: RecoilRoot }
        );
      });
      expect(
        await screen.findByText("Problems with load teams and groups")
      ).toBeInTheDocument();
    });
  });
});
