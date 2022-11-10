import { act, render, screen } from "@testing-library/react";
import GroupsList from "./GroupsList";

describe("Group List tests", () => {
  test("should display correct text if user doesn't join to any group", async () => {
    await act(() => {
      render(<GroupsList groups={[]} />);
    });
    expect(
      await screen.findByText("Create or join to the group")
    ).toBeInTheDocument();
  });
});
