import axios from "axios";

export class UserService {
  static async createUser(userInfo) {
    const formData = new FormData();
    formData.append("firstName", userInfo.firstName);
    formData.append("lastName", userInfo.lastName);
    formData.append("location", userInfo.location);
    formData.append("nickName", userInfo.nickName.trim());
    formData.append("email", userInfo.email);
    formData.append("number", userInfo.number);
    formData.append("dateOfBirthday", userInfo.dateOfBirthday);
    formData.append("password", userInfo.password);
    formData.append("gender", userInfo.gender);
    formData.append("languages", userInfo.languages);
    formData.append("avatar", userInfo.file);
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/api/user/registration",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  }

  static async getAllUsers() {
    const users = await fetch(process.env.REACT_APP_API_URL + `/api/user/all`);
    const data = users.json();
    return data;
  }

  static async findUser(userNickName) {
    const user = await fetch(
      process.env.REACT_APP_API_URL + `/api/user/check/${userNickName}`
    );
    const data = user.json();
    return data;
  }

  static async getStatus(userNickName) {
    const user = await fetch(
      process.env.REACT_APP_API_URL + `/api/user/status/${userNickName}`
    );
    const data = user.json();
    return data;
  }

  static async updateStatus(userNickName, data) {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + `/api/user/status/update/${userNickName}`,
      data
    );
    return response;
  }

  static async loginUser(data) {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/api/user/login",
      data
    );
    return response;
  }

  static async createTeam(data) {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/api/team/create",
      data
    );
    return response;
  }

  static async updateTeam(teamName, users) {
    const response = await axios.put(
      process.env.REACT_APP_API_URL + `/api/team/update/${teamName}`,
      users
    );
    return response;
  }

  static async getTeams(user) {
    const response = await axios.get(
      process.env.REACT_APP_API_URL + `/api/team/all/${user}`
    );
    return response.data;
  }

  static async createGroup(data) {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/api/group/create",
      data
    );
    return response;
  }

  static async getGroups(user) {
    const response = await axios.get(
      process.env.REACT_APP_API_URL + `/api/group/all/${user}`
    );
    return response.data;
  }

  static async createMessage(messageData) {
    const formData = new FormData();
    formData.append("from", messageData.from);
    formData.append("to", messageData.to);
    formData.append("sender", messageData.sender);
    formData.append("text", messageData.message.text);
    formData.append("sendTime", messageData.message.sendTime);
    formData.append("avatar", messageData.file);
    formData.append("isRead", messageData.isRead);
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/api/message/create",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }

  static async updateReadStatus(users) {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/api/message/update/status",
      users
    );
    return response.data;
  }

  static async getUnreadMessages(users) {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/api/message/unread",
      users
    );
    return response.data;
  }

  static async getAllMessages(users) {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/api/message/all",
      users
    );
    return response.data;
  }

  static async getLastMessage(users) {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/api/message/last",
      users
    );
    return response.data;
  }
}
