import { act, render, screen, waitFor } from "@testing-library/react";
import Chat from "./Chat";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { selectedUserState } from "../../../state/selectedUserState/atomSelectedUserState";
import { activeUser } from "../../../state/activeUserState/atomActiveUser";
import { UserService } from "../../../utils/UserService/UserService";
import MockedSocket from "socket.io-mock";

jest.mock("../../../utils/UserService/UserService");

export const allMessagesMockResponse = [
  {
    isRead: true,
    message: { text: "Mock text 1", sendTime: "18:15am", file: null },
    sender: "user2_id",
    users: ["user1_id", "user2_id"],
  },
  {
    isRead: true,
    message: {
      text: "Screenshot from 2022-10-04 21-59-00.png",
      sendTime: "20:20am",
      file: "8ebdf961-f0b0-4751-abad-4eb46d5dd5e5.png",
    },
    sender: "user2_id",
    users: ["user1_id", "user2_id"],
  },
];

export const WithActiveAndSelectedUser = ({ children }) => {
  const setActiveUser = useSetRecoilState(activeUser);
  const setSelectedUser = useSetRecoilState(selectedUserState);

  useEffect(() => {
    setActiveUser({
      avatar: "/images/avatar.jpg",
      id: "user1_id",
      firstName: "Rachel",
      lastName: "Curtis",
    });
    setSelectedUser({
      dateOfBirth: "January 2, 1990",
      email: "someemail2@gmail.com",
      gender: "Male",
      id: "user2_id",
      languages: ["English"],
      location: "San Francisco, USA",
      messageContent: "I send you a few files for works please send me back",
      nickName: "some nickname 2",
      number: "(805) 651-9081",
      senderAvatar: "/images/secondUserAvatr.jpg",
      senderName: "Matt Tompson",
      status: "read",
      time: "2:10pm",
      type: "notification",
      userStatus: "online",
    });
  }, []);
  return <>{children}</>;
};

describe("Chat tests", () => {
  test("should show correct text if user doesn't select another user for chatting", async () => {
    await act(async () => {
      let socketMock = new MockedSocket();
      await render(
        <Chat
          socket={{
            current: socketMock.socketClient,
          }}
        />,
        { wrapper: RecoilRoot }
      );
    });
    expect(
      await screen.findByText("Select user to see chat with him")
    ).toBeInTheDocument();
  });

  test("should fetch data and then render correct messages list", async () => {
    const mockedUserService = jest.mocked(UserService);
    mockedUserService.getAllMessages.mockResolvedValue(allMessagesMockResponse);

    await act(async () => {
      let socketMock = new MockedSocket();
      await render(
        <WithActiveAndSelectedUser>
          <Chat
            socket={{
              current: socketMock.socketClient,
            }}
          />
        </WithActiveAndSelectedUser>,
        { wrapper: RecoilRoot }
      );
    });
    await waitFor(async () =>
      expect(await screen.findByText("Mock text 1")).toBeInTheDocument()
    );
    await waitFor(async () =>
      expect(await screen.findByText("18:15am")).toBeInTheDocument()
    );
    await waitFor(async () =>
      expect(
        await screen.findByText("Screenshot from 2022-10-04 21-59-00.png")
      ).toBeInTheDocument()
    );
    await waitFor(async () =>
      expect(await screen.findByText("20:20am")).toBeInTheDocument()
    );
  });
});
