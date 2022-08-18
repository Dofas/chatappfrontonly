import { act, render, screen } from "@testing-library/react";
import NavBar from "./NavBar";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import userEvent from "@testing-library/user-event";

describe("NavBar tests ", () => {
  test("should render navigation bar and be able to redirect after click on a link", async () => {
    const history = createMemoryHistory();
    history.push = jest.fn();

    render(
      <Router location={history.location} navigator={history}>
        <NavBar activeLink={"messages"} id={"someId"} />
      </Router>
    );

    await act(() => userEvent.click(screen.getByText("Messages")));
    expect(history.push).toHaveBeenLastCalledWith(
      {
        hash: "",
        pathname: "/chatapp/messages/someId",
        search: "",
      },
      undefined
    );
  });
});
