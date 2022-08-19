import { UserService } from "../../../utils/UserService/UserService";
import { render, screen, act } from "@testing-library/react";
import ChannelList from "./ChannelList";
import { RecoilRoot } from "recoil";
import { WithActiveUser } from "../HeaderComponent/Header.test";
import userEvent from "@testing-library/user-event";

jest.mock("../../../utils/UserService/UserService");

const channelsResponse = {
  id: "someId",
  groups: ["someGroup", "someGroup2", "someGroup3"],
  teams: ["someTeam", "someTeam2", "someTeam3"],
};
const teamWIthMembersResponse = [
  {
    team: "someTeam",
    members: ["someId", "someUser2"],
  },
  {
    team: "someTeam2",
    members: ["someId", "someUser2", "someUser3"],
  },
  {
    team: "someTeam3",
    members: ["someId", "someUser2", "someUser3", "someUser4"],
  },
];

describe("Channel list tests", () => {
  describe("With response 200", () => {
    beforeEach(async () => {
      const mockedUserService = jest.mocked(UserService);
      mockedUserService.fetchChannels.mockResolvedValue(channelsResponse);
      mockedUserService.fetchTeamsMembers.mockResolvedValue(
        teamWIthMembersResponse
      );
      await act(() => {
        render(
          <WithActiveUser>
            <ChannelList />
          </WithActiveUser>,
          { wrapper: RecoilRoot }
        );
      });
    });

    test("should fetch channels info and load components", async () => {
      expect(await screen.findByText("#someTeam")).toBeInTheDocument();
      expect(await screen.findByText("#someTeam2")).toBeInTheDocument();
      expect(await screen.findByText("#someTeam3")).toBeInTheDocument();
      expect(await screen.findByText("2")).toBeInTheDocument();
      expect(await screen.findByText("3")).toBeInTheDocument();
      expect(await screen.findByText("4")).toBeInTheDocument();
      expect(await screen.findByText("#someGroup")).toBeInTheDocument();
      expect(await screen.findByText("#someGroup2")).toBeInTheDocument();
      expect(await screen.findByText("#someGroup3")).toBeInTheDocument();
    });

    test("should open and close modals on add team and add group buttons", async () => {
      const addTeamBtn = await screen.findByTestId("add-team-button");
      await act(async () => userEvent.click(addTeamBtn));
      expect(await screen.findByText("Type team name")).toBeInTheDocument();
      await act(async () =>
        userEvent.click(await screen.findByTestId("close-add-team-modal-btn"))
      );
      expect(screen.queryByText("Type team name")).not.toBeInTheDocument();
      const addTGroupBtn = await screen.findByTestId("add-group-button");
      await act(async () => userEvent.click(addTGroupBtn));
      expect(await screen.findByText("Type group name")).toBeInTheDocument();
      await act(async () =>
        userEvent.click(await screen.findByTestId("close-add-group-modal-btn"))
      );
      expect(screen.queryByText("Type group name")).not.toBeInTheDocument();
    });

    test("should be able to change active group", async () => {
      expect(await screen.findByTitle("someTeam")).toHaveClass("active-team");
      expect(await screen.findByTitle("someTeam2")).not.toHaveClass(
        "active-team"
      );
      await act(async () =>
        userEvent.click(await screen.findByTitle("someTeam2"))
      );
      expect(await screen.findByTitle("someTeam")).not.toHaveClass(
        "active-team"
      );
      expect(await screen.findByTitle("someTeam2")).toHaveClass("active-team");
    });
  });

  describe("With error response", () => {
    test("should show correct text if back-end return an error", async () => {
      const mockedUserService = jest.mocked(UserService);
      mockedUserService.fetchChannels.mockRejectedValue(new Error());
      mockedUserService.fetchTeamsMembers.mockRejectedValue(new Error());
      await act(() => {
        render(
          <WithActiveUser>
            <ChannelList />
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
