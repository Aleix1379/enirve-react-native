export default class SharedService {
  serverUrl = 'https://enirve.com';

  getApiUrl(path) {
    if (!path.startsWith('/')) {
      path = `/${path}`;
    }
    return `${this.serverUrl}/api/v1${path}`;
  }
}
