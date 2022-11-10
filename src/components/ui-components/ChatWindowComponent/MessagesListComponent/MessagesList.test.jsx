import { act, render, screen } from "@testing-library/react";
import MessagesList from "./MessagesList";
import { WithActiveAndSelectedUser } from "../../../page-components/ChatComponent/Chat.test";
import { RecoilRoot } from "recoil";
import MockedSocket from "socket.io-mock";
import { UserService } from "../../../../utils/UserService/UserService";

jest.mock("../../../../utils/UserService/UserService");

describe("Messages list tests", () => {
  test("should render correct text if messages not exist", async () => {
    const mockedUserService = jest.mocked(UserService);
    mockedUserService.getAllMessages.mockResolvedValueOnce([]);
    await act(async () => {
      let socketMock = new MockedSocket();
      await render(
        <WithActiveAndSelectedUser>
          <MessagesList
            socket={{
              current: socketMock.socketClient,
            }}
            setIsError={jest.fn()}
          />
        </WithActiveAndSelectedUser>,
        { wrapper: RecoilRoot }
      );
    });
    expect(
      await screen.findByText("You have no messages with this user")
    ).toBeInTheDocument();
  });
});
