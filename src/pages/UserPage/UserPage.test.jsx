import { UserService } from "../../utils/UserService/UserService";
import { render, waitFor, screen } from "@testing-library/react";
import UserPage from "./UserPage";
import { RecoilRoot } from "recoil";
import { MemoryRouter } from "react-router-dom";
import MockedSocket from "socket.io-mock";

jest.mock("../../utils/UserService/UserService");

describe("User Page tests", () => {
  test("should show correct text if user doesnt sign in", async () => {
    const mockedUserService = jest.mocked(UserService);
    mockedUserService.getAllUsers.mockResolvedValue(null);
    let socketMock = new MockedSocket();

    await waitFor(() =>
      render(
        <MemoryRouter>
          <UserPage
            activeLink={"messages"}
            socket={{
              current: socketMock.socketClient,
            }}
          />
        </MemoryRouter>,
        { wrapper: RecoilRoot }
      )
    );

    expect(await screen.findByText("You need to sign in")).toBeInTheDocument();
  });
});
