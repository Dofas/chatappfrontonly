import { UserService } from "../../utils/UserService/UserService";
import { act, render, screen } from "@testing-library/react";
import UserPage from "./UserPage";
import { RecoilRoot } from "recoil";
import {
  BrowserRouter,
  MemoryRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import userEvent from "@testing-library/user-event";
import {
  mockChannels,
  mockFirstMessage,
  mockLastMessages,
  mockNotifications,
  mockSecondMessage,
  mockTeamResponse,
  mockTeamWIthMembers,
  mockThirdMessage,
  mockUser,
  mockUser2,
  mockUser3,
  mockUser4,
} from "./mockData";

jest.mock("../../utils/UserService/UserService");

describe("User Page tests", () => {
  test("should successfully fetch data and render user page with all components", async () => {
    const mockedUserService = jest.mocked(UserService);
    mockedUserService.findUser
      .mockResolvedValueOnce(mockUser)
      .mockResolvedValueOnce(mockUser2)
      .mockResolvedValueOnce(mockUser3)
      .mockResolvedValueOnce(mockUser4)
      .mockResolvedValueOnce(mockUser2)
      .mockResolvedValueOnce(mockUser3)
      .mockResolvedValueOnce(mockUser4);
    mockedUserService.fetchNotifications.mockResolvedValue(mockNotifications);
    mockedUserService.fetchChannels.mockResolvedValue(mockChannels);
    mockedUserService.fetchTeamsMembers.mockResolvedValue(mockTeamWIthMembers);
    mockedUserService.fetchTeamMembers.mockResolvedValue(mockTeamResponse);
    mockedUserService.getLastMessages.mockResolvedValue(mockLastMessages);
    mockedUserService.getMessageInfo
      .mockResolvedValueOnce(mockFirstMessage)
      .mockResolvedValueOnce(mockSecondMessage)
      .mockResolvedValueOnce(mockThirdMessage);

    await act(() => {
      render(
        <BrowserRouter>
          <Routes>
            <Route
              index
              element={<Navigate to={"/chatapp/messages/someId"} />}
            />
            <Route
              path="/chatapp/messages/:id"
              element={<UserPage activeLink={"messages"} />}
            />
          </Routes>
        </BrowserRouter>,
        { wrapper: RecoilRoot }
      );
    });

    expect(await screen.findByText("firstName SecondName")).toBeInTheDocument();
    expect(
      await screen.findByTestId("active-user-notification-count")
    ).toHaveTextContent("2");
    expect(
      await screen.findByTestId("active-user-messages-count")
    ).toHaveTextContent("5");
    expect(await screen.findByAltText("active-avatar")).toBeInTheDocument();

    expect(await screen.findByText("#someTeam")).toBeInTheDocument();
    expect(await screen.findByText("#someTeam2")).toBeInTheDocument();
    const memberCount = await screen.findAllByTestId("members-count");
    expect(memberCount[0]).toHaveTextContent("4");
    expect(memberCount[1]).toHaveTextContent("4");
    expect(await screen.findByText("#someGroup")).toBeInTheDocument();

    expect(await screen.findByText("List of someTeam")).toBeInTheDocument();
    expect(screen.queryByText("List of someTeam2")).not.toBeInTheDocument();
    await act(async () =>
      userEvent.click(await screen.findByText("#someTeam2"))
    );
    expect(await screen.findByText("List of someTeam2")).toBeInTheDocument();
    expect(screen.queryByText("List of someTeam")).not.toBeInTheDocument();
    expect(screen.queryByText("some nickname 2")).not.toBeInTheDocument();
    await act(async () =>
      userEvent.click(await screen.findByText("Some User"))
    );
    expect(await screen.findByText("some nickname 2")).toBeInTheDocument();
    expect(await screen.findByText("You have no messages with this user"));
    expect(await screen.findByText("Send")).toBeInTheDocument();
  });

  test("should show correct text if user doesnt exist", async () => {
    const mockedUserService = jest.mocked(UserService);
    mockedUserService.findUser.mockResolvedValue(null);
    const { findByText } = render(
      <MemoryRouter>
        <UserPage activeLink={"messages"} />
      </MemoryRouter>,
      { wrapper: RecoilRoot }
    );

    expect(await findByText("User doesnt exist")).toBeInTheDocument();
  });
});
