import axios from "axios";
import authHeader from './auth-header';

const API_URL = "/api/auth/";
const API_USER_URL = "/api/user/";
const API_ROLE_URL = "/api/role/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          sessionStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    sessionStorage.removeItem("user");
  }

  getCurrentUser() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    return user;
  }
}

export default new AuthService();
