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
}
