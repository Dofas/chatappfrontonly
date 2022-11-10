import { act, render, screen } from "@testing-library/react";
import TeamsList from "./TeamsList";

describe("Team List tests", () => {
  test("should display correct text if user doesn't join to any team", async () => {
    await act(() => {
      render(<TeamsList teams={[]} />);
    });
    expect(
      await screen.findByText("Create or join to team")
    ).toBeInTheDocument();
  });
});
