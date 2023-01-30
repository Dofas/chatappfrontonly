import { act, render, screen, waitFor } from "@testing-library/react";
import { UserService } from "../../utils/UserService/UserService";
import userEvent from "@testing-library/user-event";
import MockedSocket from "socket.io-mock";
import { RecoilRoot } from "recoil";
import RegisterPage from "./RegisterPage";
import { BrowserRouter } from "react-router-dom";

jest.mock("../../utils/UserService/UserService");

global.window = Object.create(window);
describe("Register page tests", () => {
  test("should show error message if fields are empty", async () => {
    const registerMock = jest.mocked(UserService.createUser);
    registerMock.mockResolvedValue({ status: true });
    let socketMock = new MockedSocket();
    await waitFor(() =>
      render(
        <RecoilRoot>
          <BrowserRouter>
            <RegisterPage
              socket={{
                current: socketMock.socketClient,
              }}
            />
          </BrowserRouter>
        </RecoilRoot>
      )
    );
    await act(() => userEvent.click(screen.getByText(/Create account/i)));
    expect(screen.getAllByText("Field is required").length).toBe(6);
    expect(screen.getAllByText("Field is incorrect").length).toBe(4);
    expect(screen.getByText("Incorrect passwords")).toBeInTheDocument();
  });

  test("should navigate to login page", async () => {
    let socketMock = new MockedSocket();
    await waitFor(() =>
      render(
        <RecoilRoot>
          <BrowserRouter>
            <RegisterPage
              socket={{
                current: socketMock.socketClient,
              }}
            />
          </BrowserRouter>
        </RecoilRoot>
      )
    );
    await act(() => userEvent.click(screen.getByText(/Log In/i)));

    expect(window.location.href.includes("login")).toBeTruthy();
  });

  test("should register user and navigate to user page", async () => {
    const registerMock = jest.mocked(UserService.createUser);
    registerMock.mockResolvedValue({ status: true });
    let socketMock = new MockedSocket();
    await waitFor(() =>
      render(
        <RecoilRoot>
          <BrowserRouter>
            <RegisterPage
              socket={{
                current: socketMock.socketClient,
              }}
            />
          </BrowserRouter>
        </RecoilRoot>
      )
    );
    const fakeFile = new File(["hello"], "hello.png", { type: "image/png" });
    const firstNameInput = screen.getByTestId("firstName");
    const lastNameInput = screen.getByTestId("lastName");
    const addressInput = screen.getByTestId("address");
    const nickNameInput = screen.getByTestId("nickName");
    const emailInput = screen.getByTestId("email");
    const phoneInput = screen.getByTestId("phone");
    const dobBtn = screen.getByText("Enter your date of birth");
    const genderInput = screen.getByText("Male");
    const fileInput = screen.getByTestId("file");
    const languagesInput = screen.getByText("Ukrainian");
    const passwordInput = screen.getByTestId("password");
    const confirmPasswordInput = screen.getByTestId("confirmPassword");
    await userEvent.type(firstNameInput, "firstNameInput");
    await userEvent.type(lastNameInput, "lastNameInput");
    await userEvent.type(addressInput, "addressInput");
    await userEvent.type(nickNameInput, "nickNameInput");
    await userEvent.type(emailInput, "emailInput@gmail.com");
    await userEvent.type(phoneInput, "+38-111-111-1111");
    await userEvent.click(dobBtn);
    await userEvent.click(screen.getByText("20"));
    await userEvent.click(genderInput);
    await userEvent.upload(fileInput, fakeFile);
    await userEvent.click(languagesInput);
    await userEvent.type(passwordInput, "passwordInput");
    await userEvent.type(confirmPasswordInput, "passwordInput");
    await act(async () => userEvent.click(screen.getByText(/Create account/i)));

    expect(window.location.href.includes("nickNameInput")).toBeTruthy();
    expect(window.location.href.includes("messages")).toBeTruthy();
  });
});
