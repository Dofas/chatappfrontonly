import { act, render, screen } from "@testing-library/react";
import GroupsList from "./GroupsList";
import userEvent from "@testing-library/user-event";

const groups = ["someGroup", "someGroup2"];

describe("Group List tests", () => {
  describe("group list with no empty response", () => {
    beforeEach(async () => {
      await act(() => {
        render(<GroupsList groups={groups} />);
      });
    });

    test("should render groups list", async () => {
      expect(await screen.findByText("#someGroup")).toBeInTheDocument();
      expect(await screen.findByText("#someGroup2")).toBeInTheDocument();
    });

    test("should open and close modal", async () => {
      const addTBtn = await screen.findByTestId("add-group-button");
      await act(async () => userEvent.click(addTBtn));
      expect(await screen.findByText("Type group name")).toBeInTheDocument();
      await act(async () =>
        userEvent.click(await screen.findByTestId("close-add-group-modal-btn"))
      );
      expect(screen.queryByText("Type group name")).not.toBeInTheDocument();
    });

    test("should prevent saving group with empty name and show error message", async () => {
      const addTBtn = await screen.findByTestId("add-group-button");
      await act(async () => userEvent.click(addTBtn));
      await act(async () =>
        userEvent.click(await screen.findByTestId("group-save-btn"))
      );
      expect(
        await screen.findByText("You can not create group with empty name")
      ).toBeInTheDocument();
    });
  });

  describe("group list with empty response", () => {
    test("should display correct text if user doesn't join to any group", async () => {
      await act(() => {
        render(<GroupsList groups={[]} />);
      });
      expect(
        await screen.findByText("Create or join to the group")
      ).toBeInTheDocument();
    });
  });
});
