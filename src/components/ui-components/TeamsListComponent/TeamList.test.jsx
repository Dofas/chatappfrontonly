import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TeamsList from "./TeamsList";

const teams = [
  {
    team: "someTeam",
    members: ["someId", "someUser2"],
  },
  {
    team: "someTeam2",
    members: ["someId", "someUser2", "someUser3"],
  },
];

describe("Team List tests", () => {
  describe("team list with no empty response", () => {
    const setActiveTeam = jest.fn();
    const TeamListWithState = () => {
      return <TeamsList teams={teams} setActiveTeam={setActiveTeam} />;
    };
    beforeEach(async () => {
      await act(() => {
        render(<TeamListWithState />);
      });
    });

    test("should render team list", async () => {
      expect(await screen.findByText("#someTeam")).toBeInTheDocument();
      expect(await screen.findByText("#someTeam2")).toBeInTheDocument();
      expect(await screen.findByText("2")).toBeInTheDocument();
      expect(await screen.findByText("3")).toBeInTheDocument();
    });

    test("should open and close modal", async () => {
      const addBtn = await screen.findByTestId("add-team-button");
      await act(async () => userEvent.click(addBtn));
      expect(await screen.findByText("Type team name")).toBeInTheDocument();
      await act(async () =>
        userEvent.click(await screen.findByTestId("close-add-team-modal-btn"))
      );
      expect(screen.queryByText("Type team name")).not.toBeInTheDocument();
    });

    test("should prevent saving team with empty name and show error message", async () => {
      const addTBtn = await screen.findByTestId("add-team-button");
      await act(async () => userEvent.click(addTBtn));
      await act(async () =>
        userEvent.click(await screen.findByTestId("team-save-btn"))
      );
      expect(
        await screen.findByText("You can not create team with empty name")
      ).toBeInTheDocument();
    });

    test("should call onChange function when team list item clicked", async () => {
      await act(async () =>
        userEvent.click(await screen.findByText("#someTeam2"))
      );
      expect(setActiveTeam).toHaveBeenCalledWith("someTeam2");
    });
  });
  describe("team list with empty response", () => {
    test("should display correct text if user doesn't join to any team", async () => {
      await act(() => {
        render(<TeamsList teams={[]} />);
      });
      expect(
        await screen.findByText("Create or join to team")
      ).toBeInTheDocument();
    });
  });
});
