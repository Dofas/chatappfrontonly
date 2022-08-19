import { act, render, screen } from "@testing-library/react";
import MessagesList from "./MessagesList";
import { WithActiveAndSelectedUser } from "../../../page-components/ChatComponent/Chat.test";
import { RecoilRoot } from "recoil";

const messages = [
  {
    messageText: "Big room.jpg",
    messageTime: "11:22pm",
    sender: "user1_id",
  },
  {
    messageText: "Mock message text",
    messageTime: "14:32pm",
    sender: "user2_id",
  },
];

describe("Messages list tests", () => {
  test("should render correct text if messages not exist", async () => {
    await act(() => {
      render(
        <WithActiveAndSelectedUser>
          <MessagesList />
        </WithActiveAndSelectedUser>,
        { wrapper: RecoilRoot }
      );
    });
    expect(
      await screen.findByText("You have no messages with this user")
    ).toBeInTheDocument();
  });

  test("should render correct message list and download image from message", async () => {
    await act(() => {
      render(
        <WithActiveAndSelectedUser>
          <MessagesList messages={messages} />
        </WithActiveAndSelectedUser>,
        { wrapper: RecoilRoot }
      );
    });
    expect(await screen.findByText("Big room.jpg")).toBeInTheDocument();
    expect(await screen.findByText("11:22pm")).toBeInTheDocument();
    expect(await screen.findByText("Mock message text")).toBeInTheDocument();
    expect(await screen.findByText("14:32pm")).toBeInTheDocument();
    expect(screen.getByText("Download")).toHaveAttribute("download");
    expect(screen.getByText("Download")).toHaveAttribute(
      "href",
      "/images/Bigroom.jpg"
    );
  });
});
