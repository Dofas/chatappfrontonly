import { render, screen, waitFor } from "@testing-library/react";
import Header from "./Header";
import { UserService } from "../../../utils/UserService/UserService";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { activeUser } from "../../../state/activeUserState/atomActiveUser";

jest.mock("../../../utils/UserService/UserService");

const PageWithRecoilState = () => {
  const setActiveUser = useSetRecoilState(activeUser);

  useEffect(() => {
    setActiveUser({
      id: "someId",
      firstName: "firstName",
      lastName: "lastName",
    });
  }, []);
  return <Header activeLink={"statistics"} />;
};

describe("Header test", () => {
  test("should render navbar with active statistics link and user info without notifications", async () => {
    const mockedUserService = jest.mocked(UserService);
    const mockNotifications = {
      importantNotification: undefined,
      simpleNotification: undefined,
    };
    mockedUserService.fetchNotifications.mockResolvedValue(mockNotifications);

    await waitFor(() => {
      render(
        <BrowserRouter>
          <PageWithRecoilState />
        </BrowserRouter>,
        { wrapper: RecoilRoot }
      );
    });
    expect(screen.getByText("All Projects")).toBeInTheDocument();
    expect(screen.getByText("Teams")).toBeInTheDocument();
    expect(screen.getByText("Messages")).toBeInTheDocument();
    expect(screen.getByText("Statistics")).toHaveClass(
      "active-header-nav-bar-link"
    );
    expect(screen.getByText("Search")).toBeInTheDocument();
    expect(screen.getByAltText("star")).toBeInTheDocument();
    expect(screen.getByAltText("bell")).toBeInTheDocument();
    expect(screen.getByAltText("question")).toBeInTheDocument();
    expect(screen.getByAltText("globe")).toBeInTheDocument();
    expect(await screen.findByText("firstName lastName")).toBeInTheDocument();
  });
});
