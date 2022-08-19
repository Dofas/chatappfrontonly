import { act, render, screen } from "@testing-library/react";
import Chat from "./Chat";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { selectedUserState } from "../../../state/selectedUserState/atomSelectedUserState";
import { activeUser } from "../../../state/activeUserState/atomActiveUser";
import { UserService } from "../../../utils/UserService/UserService";

jest.mock("../../../utils/UserService/UserService");

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

const allMessagesMockResponse = [
  { getter: "user1_id", messageId: "message_1", sender: "user2_id" },
  { getter: "user2_id", messageId: "message_2", sender: "user1_id" },
];

const firstMessageInfo = [
  {
    content: "Mock text 1",
    id: "message_1",
    sendTime: "10:30pm",
  },
];

const secondMessageInfo = [
  {
    content: "Mock text 2",
    id: "message_2",
    sendTime: "12:51pm",
  },
];

describe("Chat tests", () => {
  test("should show correct text if user doesn't select another user for chatting", async () => {
    await act(() => {
      render(<Chat />, { wrapper: RecoilRoot });
    });
    expect(
      await screen.findByText("Select user to see chat with him")
    ).toBeInTheDocument();
  });

  test("should fetch data and then render correct messages list", async () => {
    const mockedUserService = jest.mocked(UserService);
    mockedUserService.getAllMessages.mockResolvedValue(allMessagesMockResponse);
    mockedUserService.getMessageInfo
      .mockResolvedValueOnce(firstMessageInfo)
      .mockResolvedValueOnce(secondMessageInfo);

    await act(() => {
      render(
        <WithActiveAndSelectedUser>
          <Chat />
        </WithActiveAndSelectedUser>,
        { wrapper: RecoilRoot }
      );
    });
    expect(await screen.findByText("Mock text 1")).toBeInTheDocument();
    expect(await screen.findByText("10:30pm")).toBeInTheDocument();
    expect(await screen.findByText("Mock text 2")).toBeInTheDocument();
    expect(await screen.findByText("12:51pm")).toBeInTheDocument();
  });

  test("should show correct text if back-end return an error", async () => {
    const mockedUserService = jest.mocked(UserService);
    mockedUserService.getAllMessages.mockRejectedValue(new Error());

    await act(() => {
      render(
        <WithActiveAndSelectedUser>
          <Chat />
        </WithActiveAndSelectedUser>,
        { wrapper: RecoilRoot }
      );
    });
    expect(
      await screen.findByText("Problems with load messages")
    ).toBeInTheDocument();
  });
});
