export const mockUser = {
  id: "someId",
  firstName: "firstName",
  lastName: "SecondName",
  avatar: "some/path.jpg",
};
export const mockUser2 = {
  avatar: "/images/secondUserAvatr.jpg",
  dateOfBirthday: "January 2, 1990",
  email: "someemail2@gmail.com",
  firstName: "Some",
  gender: "Male",
  id: "someUser2",
  languages: ["English"],
  lastName: "User",
  location: "San Francisco, USA",
  nickName: "some nickname 2",
  number: "(805) 651-9081",
  status: "online",
};
export const mockUser3 = {
  avatar: "/images/thirdUserAvatar.jpg",
  dateOfBirthday: "April 3, 2000",
  email: "someemail3@gmail.com",
  firstName: "Aaron",
  gender: "Male",
  id: "someUser3",
  languages: ["English", "French"],
  lastName: "Walker",
  location: "Los Angeles, USA",
  nickName: "some nickname 3",
  number: "(805) 651-9082",
  status: "offline",
};
export const mockUser4 = {
  avatar: "/images/fourthUserAvatar.jpg",
  dateOfBirthday: "June 20, 1998",
  email: "rachelcurtis@itzpromo.com",
  firstName: "Rachel",
  gender: "Female",
  id: "someUser4",
  languages: ["English", "French"],
  lastName: "Curtis",
  location: "New York, USA",
  nickName: "Silentgirl",
  number: "(805) 651-9099",
  status: "busy",
};
export const mockNotifications = {
  importantNotification: "2",
  simpleNotification: "5",
};
export const mockChannels = {
  id: "someId",
  groups: ["someGroup"],
  teams: ["someTeam", "someTeam2"],
};
export const mockTeamWIthMembers = [
  {
    team: "someTeam",
    members: ["someId", "someUser2", "someUser3", "someUser4"],
  },
  {
    team: "someTeam2",
    members: ["someId", "someUser2", "someUser3", "someUser4"],
  },
];
export const mockTeamResponse = [
  {
    team: "someTeam",
    members: ["someId", "someUser2", "someUser3", "someUser4"],
  },
  {
    team: "someTeam2",
    members: ["someId", "someUser2", "someUser3", "someUser4"],
  },
];
export const mockLastMessages = [
  { getter: "someId", messageId: "message_1", sender: "someUser2" },
  { getter: "someId", messageId: "message_2", sender: "someUser3" },
  { getter: "someId", messageId: "message_3", sender: "someUser4" },
];
export const mockFirstMessage = [
  {
    content: "Some text",
    id: "message_1",
    sendTime: "1:48pm",
    status: "read",
    type: "message",
  },
];
export const mockSecondMessage = [
  {
    content: "Hi I'm another text",
    id: "message_2",
    sendTime: "3:25pm",
    status: "unread",
    type: "message",
  },
];
export const mockThirdMessage = [
  {
    content: "Hello text how are you?",
    id: "message_3",
    sendTime: "5:10pm",
    status: "read",
    type: "notification",
  },
];
