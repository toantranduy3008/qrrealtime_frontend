import axios from 'axios';
import authHeader from '../common/AuthHeader';

const API_URL = './api/user/';

class UserService {
  register(fullName, username, email, role, password) {
    const data = {
      fullName,
      username,
      email,
      role,
      password
    };
    return axios.post(API_URL + "createuser", data,
      { headers: authHeader(data) });
  }

  getUsersList() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  getUsersListPaging(page, pagesize) {
    return axios.get(API_URL + "paging?page=" + page + "&pagesize=" + pagesize, { headers: authHeader() });
  }

  getUserDetail(id) {
    return axios.get(API_URL + id, { headers: authHeader() });
  }

  saveUserRoles(id, roles) {
    const data = {
      id, roles
    };
    return axios.post(API_URL + "saveuserroles", data,
      { headers: authHeader(data) });
  }

  saveUserPassword(userId, password) {
    const data = {
      userId, password
    };
    return axios.post(API_URL + "saveuserpassword", {
      userId, password
    },
      { headers: authHeader(data) });
  }

  saveMyPassword(oldPassword, newPassword) {
    const data = {
      oldPassword, newPassword
    };
    return axios.post(API_URL + "savemypassword", {
      oldPassword, newPassword
    },
      { headers: authHeader(data) });
  }

  deleteUser(id) {
    return axios.delete(API_URL + id, { headers: authHeader() });
  }
}

export default new UserService();
