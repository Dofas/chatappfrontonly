import { act, render, screen, waitFor } from "@testing-library/react";
import { UserService } from "../../utils/UserService/UserService";
import userEvent from "@testing-library/user-event";
import MockedSocket from "socket.io-mock";
import { RecoilRoot } from "recoil";
import LoginPage from "./LoginPage";
import { BrowserRouter } from "react-router-dom";

jest.mock("../../utils/UserService/UserService");

global.window = Object.create(window);
describe("Login page tests", () => {
  test("should navigate to register page", async () => {
    let socketMock = new MockedSocket();
    await waitFor(() =>
      render(
        <RecoilRoot>
          <BrowserRouter>
            <LoginPage
              socket={{
                current: socketMock.socketClient,
              }}
            />
          </BrowserRouter>
        </RecoilRoot>
      )
    );
    await act(() => userEvent.click(screen.getByText(/Register/i)));

    expect(window.location.href.includes("register")).toBeTruthy();
  });

  test("should show error message if fields are empty", async () => {
    let socketMock = new MockedSocket();
    await waitFor(() =>
      render(
        <RecoilRoot>
          <BrowserRouter>
            <LoginPage
              socket={{
                current: socketMock.socketClient,
              }}
            />
          </BrowserRouter>
        </RecoilRoot>
      )
    );
    await act(() => userEvent.click(screen.getByText(/Login/i)));
    expect(
      screen.getByText("Incorrect nickname or password")
    ).toBeInTheDocument();
  });

  test("should register user and navigate to user page", async () => {
    const loginMock = jest.mocked(UserService.loginUser);
    loginMock.mockResolvedValue(Promise.resolve({ status: true }));
    let socketMock = new MockedSocket();
    await waitFor(() =>
      render(
        <RecoilRoot>
          <BrowserRouter>
            <LoginPage
              socket={{
                current: socketMock.socketClient,
              }}
            />
          </BrowserRouter>
        </RecoilRoot>
      )
    );

    const nickNameInput = screen.getByTestId("login-page-nickName");
    const passwordInput = screen.getByTestId("login-page-password");
    await userEvent.type(nickNameInput, "nickNameInput");
    await userEvent.type(passwordInput, "passwordInput");

    await act(() => userEvent.click(screen.getByText(/Login/i)));

    expect(window.location.href.includes("nickNameInput")).toBeTruthy();
    expect(window.location.href.includes("messages")).toBeTruthy();
  });
});
