import axios from 'axios';

//When moving to to Azure and connecting the sites to each other we have to change the url
const AUTH_API_URL = 'http://localhost:3000/api/auth/';

class AuthService {
  static async register(user) {
    try {
      const response = await axios.post(AUTH_API_URL + 'register', {
        username: user.username,
        email: user.email,
        password: user.password
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      // API notes return the user data in the data property!
      // And Axios return the content in data. So, data.data ... :-)
      // Return the data that we get from the backend.
      return response.data;

    } catch (error) {
      console.error('Register error: ', error);
      throw error;
    }
  }

  static async login(user) {
    try {
      const response = await axios.post(AUTH_API_URL + 'login', {
        username: user.username,
        password: user.password
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      // API notes return the user data in the data property!
      // And Axios return the content in data. So, data.data ... :-)
      if (response.data.data.token) { //if we get a token

        localStorage.setItem('user', JSON.stringify(response.data.data));//save it here, in local storage
      }

      // Return the data that we get from the backend.
      return response.data;

    } catch (error) {
      console.error('Login error: ', error);
      throw error;
    }
  }

  static logout() {
    localStorage.removeItem('user');
  }

  // helpers
  static getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  static authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
      const headers = {
        Authorization: 'Bearer ' + user.token,
        'Content-Type': "application/x-www-form-urlencoded"

      }
      return headers;
    } else {
      return {

      };
    }
  }
}

export default AuthService;