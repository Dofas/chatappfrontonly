import { act, render, screen } from "@testing-library/react";
import Header from "./Header";
import { UserService } from "../../../utils/UserService/UserService";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { activeUser } from "../../../state/activeUserState/atomActiveUser";
import MockedSocket from "socket.io-mock";
import { unreadMessages } from "../../../state/messagesState/atomMessages";
import { useCalculateWindowSize } from "../../../utils/hooks/useCalculateWindowSize";
import userEvent from "@testing-library/user-event";

jest.mock("../../../utils/UserService/UserService");
jest.mock("../../../utils/hooks/useCalculateWindowSize");

const mockUseCalculateWindowSize = jest.mocked(useCalculateWindowSize);

export const WithActiveUser = ({ children }) => {
  const setActiveUser = useSetRecoilState(activeUser);

  useEffect(() => {
    setActiveUser({
      id: "someId",
      firstName: "firstName",
      lastName: "lastName",
      nickName: "NickName",
    });
  }, []);
  return <>{children}</>;
};

let updStatus;
const HeaderWithStates = () => {
  let socketMock = new MockedSocket();
  updStatus = jest.mocked(UserService.updateStatus);
  updStatus.mockResolvedValue({ status: true });
  const setAllUnread = useSetRecoilState(unreadMessages);
  useEffect(() => {
    setAllUnread([{ count: 2 }, { count: 3 }]);
  }, []);
  return (
    <BrowserRouter>
      <WithActiveUser>
        <Header
          activeLink={"statistics"}
          socket={{
            current: socketMock.socketClient,
          }}
        />
      </WithActiveUser>
    </BrowserRouter>
  );
};

describe("Header test", () => {
  describe("full width test", () => {
    beforeEach(async () => {
      mockUseCalculateWindowSize.mockReturnValue({
        innerWidth: 1000,
        innerHeight: 1000,
      });
      await act(async () => {
        render(<HeaderWithStates />, { wrapper: RecoilRoot });
      });
    });
    const {} = useCalculateWindowSize;
    test("should render navbar with active statistics link and user info without notifications", async () => {
      expect(screen.getByText("All Projects")).toBeInTheDocument();
      expect(screen.getByText("Teams")).toBeInTheDocument();
      expect(screen.getByText("Messages")).toBeInTheDocument();
      expect(screen.getByText("Search")).toBeInTheDocument();
      expect(screen.getByText("5")).toBeInTheDocument();
      const activeLink = screen.getByText("Statistics").parentNode;
      expect(activeLink).toHaveClass("active-header-nav-bar-link");
      expect(screen.getByAltText("star")).toBeInTheDocument();
      expect(screen.getByAltText("bell")).toBeInTheDocument();
      expect(screen.getByAltText("question")).toBeInTheDocument();
      expect(screen.getByAltText("globe")).toBeInTheDocument();
      expect(await screen.findByText("firstName lastName")).toBeInTheDocument();
    });
  });
  describe("responsive", () => {
    beforeEach(async () => {
      mockUseCalculateWindowSize.mockReturnValue({
        innerWidth: 500,
        innerHeight: 1000,
      });
      await act(async () => {
        render(<HeaderWithStates />, { wrapper: RecoilRoot });
      });
    });

    test("should show and open burger menu", async () => {
      await userEvent.click(await screen.findByTestId("burger-menu"));
      expect(screen.getByText("All Projects")).toBeInTheDocument();
      expect(screen.getByText("Teams")).toBeInTheDocument();
      expect(screen.getByText("Messages")).toBeInTheDocument();
      expect(screen.getByText("Search")).toBeInTheDocument();
      expect(screen.getByText("Statistics")).toBeInTheDocument();
    });
  });
});
