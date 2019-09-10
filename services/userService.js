import axios from 'axios';
import SharedService from './sharedService';

class UserService {
  constructor() {
    this.sharedService = new SharedService();
    this.url = this.sharedService.getApiUrl('/users');
    this.tokenUrl = this.sharedService.getApiUrl('/tokens');
  }

  getUserById(id) {
    return axios.get(`${this.url}/${id}`).then(response => response.data);
  }

  getFriends(id) {
    return axios
      .get(`${this.url}/${id}/friends`)
      .then(response => response.data);
  }

  createToken(email, password) {
    // return this.http.post<Token>(this.tokenUrl, {email, password});
    return axios
      .post(this.tokenUrl, {email, password})
      .then(response => response.data);
  }
}

export default UserService;
