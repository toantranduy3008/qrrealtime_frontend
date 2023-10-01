import axios from "axios";
import authHeader from './auth-header';

const API_URL = "./api/auth/";
const API_USER_URL = "./api/user/";
const API_ROLE_URL = "./api/role/";
const API_CAPCHA = "/merchantweb/api/portal/captcha";

class AuthService {
  login(username, password, captcha) {
    return axios
      .post(API_URL + "signin", {
        username,
        password,
        captcha
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

  getCapCha() {
    // return window.fetch(API_CAPCHA, {
    //   method: 'POST',
    // });

    return axios({
      method: 'POST',
      responseType: 'blob',
      url: API_CAPCHA
    })
  }
}

export default new AuthService();
