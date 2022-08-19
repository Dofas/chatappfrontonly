import { act, render, screen } from "@testing-library/react";
import Header from "./Header";
import { UserService } from "../../../utils/UserService/UserService";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { activeUser } from "../../../state/activeUserState/atomActiveUser";

jest.mock("../../../utils/UserService/UserService");

export const WithActiveUser = ({ children }) => {
  const setActiveUser = useSetRecoilState(activeUser);

  useEffect(() => {
    setActiveUser({
      id: "someId",
      firstName: "firstName",
      lastName: "lastName",
    });
  }, []);
  return <>{children}</>;
};

describe("Header test", () => {
  beforeEach(async () => {
    const mockedUserService = jest.mocked(UserService);
    const mockNotifications = {
      importantNotification: undefined,
      simpleNotification: undefined,
    };
    mockedUserService.fetchNotifications.mockResolvedValue(mockNotifications);

    await act(async () => {
      render(
        <BrowserRouter>
          <WithActiveUser>
            <Header activeLink={"statistics"} />
          </WithActiveUser>
        </BrowserRouter>,
        { wrapper: RecoilRoot }
      );
    });
  });

  test("should render navbar with active statistics link and user info without notifications", async () => {
    expect(screen.getByText("All Projects")).toBeInTheDocument();
    expect(screen.getByText("Teams")).toBeInTheDocument();
    expect(screen.getByText("Messages")).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
    const activeLink = screen.getByText("Statistics").parentNode;
    expect(activeLink).toHaveClass("active-header-nav-bar-link");
    expect(screen.getByAltText("star")).toBeInTheDocument();
    expect(screen.getByAltText("bell")).toBeInTheDocument();
    expect(screen.getByAltText("question")).toBeInTheDocument();
    expect(screen.getByAltText("globe")).toBeInTheDocument();
    expect(await screen.findByText("firstName lastName")).toBeInTheDocument();
  });
});
