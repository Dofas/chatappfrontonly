import { render, act, screen } from "@testing-library/react";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { selectedUserState } from "../../../state/selectedUserState/atomSelectedUserState";
import SelectedUser from "./SelectedUser";

const userInfo = {
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
};

const SelectedUserWithState = ({ user }) => {
  const setUser = useSetRecoilState(selectedUserState);
  useEffect(() => {
    setUser(user);
  }, []);
  return <SelectedUser />;
};

describe("Selected user tests", () => {
  test("should render correct user info", async () => {
    await act(() => {
      render(<SelectedUserWithState user={userInfo} />, {
        wrapper: RecoilRoot,
      });
    });
    expect(await screen.findByText("Matt Tompson")).toBeInTheDocument();
    expect(await screen.findByText("San Francisco, USA")).toBeInTheDocument();
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
  test("should render correct text if user while user dont select user", async () => {
    await act(() => {
      render(<SelectedUserWithState user={undefined} />, {
        wrapper: RecoilRoot,
      });
    });
    expect(
      await screen.findByText("Select user for seen info about him")
    ).toBeInTheDocument();
  });
});
