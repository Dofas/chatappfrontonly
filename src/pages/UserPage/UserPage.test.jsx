import { UserService } from "../../utils/UserService/UserService";
import { render } from "@testing-library/react";
import UserPage from "./UserPage";
import { RecoilRoot } from "recoil";
import {
  BrowserRouter,
  MemoryRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

jest.mock("../../utils/UserService/UserService");

describe("User Page tests", () => {
  test("should show spinner and after successfully fetch render user info", async () => {
    const mockedUserService = jest.mocked(UserService);
    const mockUser = {
      id: "someId",
      firstName: "firstName",
      lastName: "SecondName",
      avatar: "some/path.jpg",
    };
    const mockNotifications = {
      importantNotification: "2",
      simpleNotification: "5",
    };

    mockedUserService.findUser.mockResolvedValue(mockUser);
    mockedUserService.fetchNotifications.mockResolvedValue(mockNotifications);

    const { getByTestId, findByText, findByAltText, findByTestId } = render(
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate to={"/chatapp/messages/someId"} />} />
          <Route
            path="/chatapp/messages/:id"
            element={<UserPage activeLink={"messages"} />}
          />
        </Routes>
      </BrowserRouter>,
      { wrapper: RecoilRoot }
    );

    expect(getByTestId("spinner-container-data-id")).toBeInTheDocument();
    expect(await findByText("firstName SecondName")).toBeInTheDocument();
    expect(
      await findByTestId("active-user-notification-count")
    ).toHaveTextContent("2");
    expect(await findByTestId("active-user-messages-count")).toHaveTextContent(
      "5"
    );
    expect(await findByAltText("active-avatar")).toBeInTheDocument();
  });

  test("should show correct text if user doesnt exist", async () => {
    const mockedUserService = jest.mocked(UserService);
    mockedUserService.findUser.mockResolvedValue(undefined);
    const { findByText } = render(
      <MemoryRouter>
        <UserPage activeLink={"messages"} />
      </MemoryRouter>,
      { wrapper: RecoilRoot }
    );

    expect(await findByText("User doesnt exist")).toBeInTheDocument();
  });
});
