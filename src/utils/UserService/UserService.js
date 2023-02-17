import customAxios from "../../http";

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
    const response = await customAxios.post(
      "/api/user/registration",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  }

  static async getAllUsers(token) {
    const users = await customAxios.get(`/api/user/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = users.data;
    return data;
  }

  static async findUser(userNickName, token) {
    console.log(userNickName, token);
    const user = await customAxios.get(`/api/user/check/${userNickName}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = user.data;
    console.log("user", user);
    return data;
  }

  static async getStatus(userNickName, token) {
    const user = await customAxios.get(`/api/user/status/${userNickName}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = user.data;
    return data;
  }

  static async updateStatus(userNickName, data, token) {
    const response = await customAxios.post(
      `/api/user/status/update/${userNickName}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  }

  static async loginUser(data) {
    const response = await customAxios.post("/api/user/login", data);
    return response;
  }

  static async createTeam(data, token) {
    const response = await customAxios.post("/api/team/create", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  }

  static async updateTeam(teamName, users, token) {
    const response = await customAxios.put(
      `/api/team/update/${teamName}`,
      users,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  }

  static async getTeams(user, token) {
    const response = await customAxios.get(`/api/team/all/${user}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  static async createGroup(data, token) {
    const response = await customAxios.post("/api/group/create", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  }

  static async getGroups(user, token) {
    const response = await customAxios.get(`/api/group/all/${user}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  static async createMessage(messageData, token) {
    const formData = new FormData();
    formData.append("from", messageData.from);
    formData.append("to", messageData.to);
    formData.append("sender", messageData.sender);
    formData.append("text", messageData.message.text);
    formData.append("sendTime", messageData.message.sendTime);
    formData.append("avatar", messageData.file);
    formData.append("isRead", messageData.isRead);
    const response = await customAxios.post("/api/message/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  static async updateReadStatus(users, token) {
    const response = await customAxios.post(
      "/api/message/update/status",
      users,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }

  static async getUnreadMessages(users, token) {
    const response = await customAxios.post("/api/message/unread", users, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  static async getAllMessages(users, token) {
    const response = await customAxios.post("/api/message/all", users, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  static async getLastMessage(users, token) {
    const response = await customAxios.post("/api/message/last", users, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  static async getRefreshToken() {
    const response = await customAxios.post("/api/token");
    return response;
  }
}
