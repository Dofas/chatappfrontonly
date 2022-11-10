import { act, render, screen } from "@testing-library/react";
import TypeMessageContainer from "./TypeMessageContainer";
import userEvent from "@testing-library/user-event";
import { RecoilRoot } from "recoil";
import MockedSocket from "socket.io-mock";
import { UserService } from "../../../../utils/UserService/UserService";
import { WithActiveAndSelectedUser } from "../../../page-components/ChatComponent/Chat.test";

jest.mock("../../../../utils/UserService/UserService");

describe("Type message container test", () => {
  test("should be able to send message from input when button 'Send' pressed", async () => {
    const mockedUserServiceMessage = jest.mocked(UserService.createMessage);
    mockedUserServiceMessage.mockResolvedValue({ status: true });
    await act(async () => {
      let socketMock = new MockedSocket();
      await render(
        <WithActiveAndSelectedUser>
          <TypeMessageContainer
            socket={{
              current: socketMock.socketClient,
            }}
          />
        </WithActiveAndSelectedUser>,
        { wrapper: RecoilRoot }
      );
    });
    const input = await screen.findByPlaceholderText("Type your message…");
    await userEvent.type(input, "Some text");
    await act(
      async () =>
        await userEvent.click(screen.getByTestId("send-message-button"))
    );
    expect(mockedUserServiceMessage).toHaveBeenCalledWith({
      file: expect.anything(),
      from: "user1_id",
      isRead: false,
      message: {
        sendTime: expect.anything(),
        text: "Some text",
      },
      sender: "user1_id",
      to: "user2_id",
    });
    expect(input).toHaveValue("");
  });

  test("should open and close modal window for upload image on a button click", async () => {
    await act(() => {
      let socketMock = new MockedSocket();
      render(
        <TypeMessageContainer
          socket={{
            current: socketMock.socketClient,
          }}
        />,
        { wrapper: RecoilRoot }
      );
    });
    expect(screen.queryByText("Select image")).not.toBeInTheDocument();
    const paperClipBtn = await screen.findByTestId("paper-clip-btn");
    await userEvent.click(paperClipBtn);
    expect(await screen.findByText("Select image")).toBeInTheDocument();
    await userEvent.click(paperClipBtn);
    expect(screen.queryByText("Select image")).not.toBeInTheDocument();
  });

  test("should be able to upload image from modal", async () => {
    const mockedUserServiceMessage = jest.mocked(UserService.createMessage);
    mockedUserServiceMessage.mockResolvedValue({ status: true });
    await act(async () => {
      let socketMock = new MockedSocket();
      await render(
        <TypeMessageContainer
          socket={{
            current: socketMock.socketClient,
          }}
        />,
        { wrapper: RecoilRoot }
      );
    });
    const paperClipBtn = await screen.findByTestId("paper-clip-btn");
    await userEvent.click(paperClipBtn);
    expect(await screen.findByText("Select image")).toBeInTheDocument();
    const uploadImageInput = screen.getByTestId("upload-image-input");
    const file = new File(["hello"], "hello.png", { type: "image/png" });
    await act(async () => await userEvent.upload(uploadImageInput, file));
    expect(uploadImageInput.files[0]).toBe(file);
    expect(uploadImageInput.files.item(0)).toBe(file);
    expect(uploadImageInput.files).toHaveLength(1);
    expect(mockedUserServiceMessage).toHaveBeenCalled();
  });
});
