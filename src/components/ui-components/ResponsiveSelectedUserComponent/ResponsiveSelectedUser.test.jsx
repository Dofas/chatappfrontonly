import { render, act, screen } from "@testing-library/react";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { selectedUserState } from "../../../state/selectedUserState/atomSelectedUserState";
import ResponsiveSelectedUser from "./ResponsiveSelectedUser";
import MockedSocket from "socket.io-mock";
import userEvent from "@testing-library/user-event";

const userInfo = {
  dateOfBirthday: "January 2, 1990",
  email: "someemail2@gmail.com",
  gender: "Male",
  id: "user2_id",
  languages: ["English"],
  location: "San Francisco, USA",
  messageContent: "I send you a few files for works please send me back",
  nickName: "some nickname 2",
  number: "(805) 651-9081",
  senderAvatar: "/images/secondUserAvatr.jpg",
  firstName: "Matt",
  lastName: "Tompson",
  status: "read",
  time: "2:10pm",
  type: "notification",
  userStatus: "online",
};

const SelectedUserWithState = ({ user }) => {
  const setUser = useSetRecoilState(selectedUserState);
  let socketMock = new MockedSocket();
  useEffect(() => {
    setUser(user);
  }, []);
  return (
    <ResponsiveSelectedUser
      socket={{
        current: socketMock.socketClient,
      }}
    />
  );
};

describe("Responsible Selected user tests", () => {
  test("should render correct user info and be able to open and close additional info", async () => {
    await act(() => {
      render(<SelectedUserWithState user={userInfo} />, {
        wrapper: RecoilRoot,
      });
    });
    expect(await screen.findByText("Matt Tompson")).toBeInTheDocument();
    expect(await screen.findByText("San Francisco, USA")).toBeInTheDocument();

    expect(screen.queryByText("Nickname")).not.toBeInTheDocument();
    expect(screen.queryByText("some nickname 2")).not.toBeInTheDocument();
    expect(screen.queryByText("Email")).not.toBeInTheDocument();
    expect(screen.queryByText("someemail2@gmail.com")).not.toBeInTheDocument();
    expect(screen.queryByText("Phone Number")).not.toBeInTheDocument();
    expect(screen.queryByText("(805) 651-9081")).not.toBeInTheDocument();
    expect(screen.queryByText("Date of birthday")).not.toBeInTheDocument();
    expect(screen.queryByText("January 2, 1990")).not.toBeInTheDocument();
    expect(screen.queryByText("Gender")).not.toBeInTheDocument();
    expect(screen.queryByText("Male")).not.toBeInTheDocument();
    expect(screen.queryByText("Languages")).not.toBeInTheDocument();
    expect(screen.queryByText("English")).not.toBeInTheDocument();
    expect(screen.queryByText("Show full profile")).not.toBeInTheDocument();
    await userEvent.click(await screen.findByTestId("collapse-user-info"));
    expect(await screen.findByText("Nickname")).toBeInTheDocument();
    expect(await screen.findByText("some nickname 2")).toBeInTheDocument();
    expect(await screen.findByText("Email")).toBeInTheDocument();
    expect(await screen.findByText("someemail2@gmail.com")).toBeInTheDocument();
    expect(await screen.findByText("Phone Number")).toBeInTheDocument();
    expect(await screen.findByText("(805) 651-9081")).toBeInTheDocument();
    expect(await screen.findByText("Date of birthday")).toBeInTheDocument();
    expect(await screen.findByText("January 2, 1990")).toBeInTheDocument();
    expect(await screen.findByText("Gender")).toBeInTheDocument();
    expect(await screen.findByText("Male")).toBeInTheDocument();
    expect(await screen.findByText("Languages")).toBeInTheDocument();
    expect(await screen.findByText("English")).toBeInTheDocument();
    expect(await screen.findByText("Show full profile")).toBeInTheDocument();
  });
});
