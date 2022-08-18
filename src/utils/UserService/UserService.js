import { fetchDataBase } from "../fetchDataBase";

export class UserService {
  static async findUser(userId) {
    const allUsersId = await fetchDataBase("userInfo");
    const user = allUsersId.find(
      (fetchedUserId) => fetchedUserId.id === userId
    );
    return user;
  }

  static async fetchNotifications(userId) {
    const allNotifications = await fetchDataBase("userNotification");
    const userNotifications = allNotifications.find(
      (fetchedUserId) => fetchedUserId.id === userId
    );
    return userNotifications;
  }

  static async fetchChannels(userId) {
    const allChannels = await fetchDataBase("userSubscribers");
    const userChannels = allChannels.find(
      (fetchedUserId) => fetchedUserId.id === userId
    );
    return userChannels;
  }

  static async fetchTeamsMembers(teams) {
    const teamMembersResponse = await fetchDataBase("teamsMembers");
    const teamsWithMembers = teams.flatMap((team) =>
      teamMembersResponse.filter(
        (teamWithMembers) => team === teamWithMembers.team
      )
    );
    return teamsWithMembers;
  }

  static async fetchTeamMembers(team) {
    const teamMembersResponse = await fetchDataBase("teamsMembers");
    const teamsWithMembers = teamMembersResponse.filter(
      (teamWithMembers) => team === teamWithMembers.team
    );
    return teamsWithMembers;
  }

  static async getLastMessages(userId) {
    const lastMessagesResponse = await fetchDataBase("lastMessages");
    const messages = lastMessagesResponse.filter(
      (lastMessage) => lastMessage.getter === userId
    );
    return messages;
  }

  static async getMessageInfo(messageId) {
    const messagesInfoResponse = await fetchDataBase("messages");
    const messages = messagesInfoResponse.filter(
      (messageWithInfo) => messageWithInfo.id === messageId
    );
    return messages;
  }

  static async getAllMessages(senderId, userId) {
    const messagesResponse = await fetchDataBase("userMessages");
    const messages = messagesResponse.filter((message) => {
      return (message.getter === userId && message.sender === senderId) ||
        (message.getter === senderId && message.sender === userId)
        ? message
        : undefined;
    });
    return messages;
  }
}
