import axiosClient from './axiosClient';
import SharedService from './sharedService';

class UserService {
  constructor() {
    this.sharedService = new SharedService();
    this.url = this.sharedService.getApiUrl('/users');
    this.tokenUrl = this.sharedService.getApiUrl('/tokens');
  }

  getUserById(id) {
    return axiosClient.get(`${this.url}/${id}`).then(response => response.data);
  }

  find(name, property) {
    return axiosClient
      .get(`${this.url}?${property}=${name}`)
      .then(response => response.data);
  }

  updateUser(id, data) {
    return axiosClient
      .put(`${this.url}/${id}`, data)
      .then(response => response.data);
  }

  createUser(data) {
    return axiosClient.post(this.url, data).then(response => response.data);
  }

  getFriends(id) {
    return axiosClient
      .get(`${this.url}/${id}/friends`)
      .then(response => response.data);
  }

  createToken(email, password) {
    // return this.http.post<Token>(this.tokenUrl, {email, password});
    return axiosClient
      .post(this.tokenUrl, {email, password})
      .then(response => response.data);
  }
}

export default UserService;
