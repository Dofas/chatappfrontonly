import { render, screen } from "@testing-library/react";
import ActiveUser from "./ActiveUser";

describe("Active user tests", () => {
  test("should render active user with notifications", () => {
    render(
      <ActiveUser
        notificationsCount={"3"}
        messagesCount={"2"}
        userName={"someName"}
        userAvatar={"/some/path"}
      />
    );

    expect(screen.getByText("someName")).toBeInTheDocument();
    expect(
      screen.getByTestId("active-user-notification-count")
    ).toHaveTextContent("3");
    expect(screen.getByTestId("active-user-messages-count")).toHaveTextContent(
      "2"
    );
    const userAvatar = screen.getByAltText("active-avatar");
    expect(userAvatar.src).toContain("/some/path");
  });

  test("should render active user without notifications", () => {
    render(
      <ActiveUser
        notificationsCount={0}
        messagesCount={0}
        userName={"someName"}
        userAvatar={"/some/path"}
      />
    );

    expect(screen.getByText("someName")).toBeInTheDocument();
    expect(
      screen.queryByTestId("active-user-notification-count")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("active-user-messages-count")
    ).not.toBeInTheDocument();
    const userAvatar = screen.getByAltText("active-avatar");
    expect(userAvatar.src).toContain("/some/path");
  });
});
