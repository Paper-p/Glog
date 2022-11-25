interface IToken {
  accessToken: string;
  refreshToken: string;
  expiredAt: Date;
}

class TokenService {
  getLocalRefreshToken() {
    const user = JSON.parse(localStorage.getItem("token") || "{}");
    return user?.refreshToken;
  }

  getLocalAccessToken() {
    const user = JSON.parse(localStorage.getItem("token") || "{}");
    return user?.accessToken;
  }

  updateLocalAccessToken(token: string) {
    let user = JSON.parse(localStorage.getItem("token") || "{}");
    user.accessToken = token;
    localStorage.setItem("user", JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(localStorage.getItem("token") || "{}");
  }

  setUser(user: IToken) {
    localStorage.setItem("token", JSON.stringify(user));
  }

  removeUser() {
    localStorage.removeItem("token");
  }
}

export default new TokenService();
