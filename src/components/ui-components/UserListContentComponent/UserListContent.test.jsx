import { render, screen, act } from "@testing-library/react";
import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import UserListContent from "./UserListContent";
import { selectedUserState } from "../../../state/selectedUserState/atomSelectedUserState";
import { usersList } from "../../../state/activeUserListState/atomActiveUserListState";
import userEvent from "@testing-library/user-event";

const mockUsers = [
  {
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
  },
  {
    dateOfBirth: "January 3, 1990",
    email: "someemail3@gmail.com",
    gender: "Male",
    id: "user3_id",
    languages: ["English", "French"],
    location: "Los Angeles, USA",
    messageContent:
      "Write me about a project i wanna help u with some problems",
    nickName: "some nickname 3",
    number: "(805) 651-9082",
    senderAvatar: "/images/thirdUserAvatar.jpg",
    senderName: "Aaron Walker",
    status: "read",
    time: "5:10pm",
    type: "message",
    userStatus: "offline",
  },
  {
    dateOfBirth: "January 20, 1990",
    email: "rachelcurtis@itzpromo.com",
    gender: "Female",
    id: "user4_id",
    languages: ["English", "French"],
    location: "New York, USA",
    messageContent: "Thanks friend! I’m working now can we call later ?",
    nickName: "Silentgirl",
    number: "(805) 651-9088",
    senderAvatar: "/images/fourthUserAvatar.jpg",
    senderName: "Rachel Curtis",
    status: "unread",
    time: "6:15am",
    type: "notification",
    userStatus: "busy",
  },
];

const UserListContentWithState = ({ onUserSelect, users }) => {
  const setUsers = useSetRecoilState(usersList);
  const chosenUser = useRecoilValue(selectedUserState);
  useEffect(() => {
    setUsers(users);
  }, []);
  useEffect(() => {
    onUserSelect(chosenUser);
  }, [chosenUser]);
  return <UserListContent />;
};

describe("User list content tests", () => {
  const onUserSelect = jest.fn();
  test("should be able to select user when clicked on user", async () => {
    await act(() => {
      render(
        <UserListContentWithState
          onUserSelect={onUserSelect}
          users={mockUsers}
        />,
        {
          wrapper: RecoilRoot,
        }
      );
    });

    const user = await screen.findByText("Matt Tompson");
    expect(user.parentNode.parentNode.parentNode).not.toHaveClass(
      "user-list-active-team-user"
    );
    await act(async () => userEvent.click(user));
    expect(onUserSelect).toHaveBeenCalledWith(mockUsers[0]);
    expect(user.parentNode.parentNode.parentNode).toHaveClass(
      "user-list-active-team-user"
    );
  });
  test("should render correct text if users doesn't exists", async () => {
    await act(() => {
      render(
        <UserListContentWithState
          onUserSelect={onUserSelect}
          users={undefined}
        />,
        {
          wrapper: RecoilRoot,
        }
      );
    });

    expect(await screen.findByText("No users matched")).toBeInTheDocument();
  });
});
