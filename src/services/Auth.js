import Vue from 'vue'
import router from '../router'

export default {
  user: null,

  _setUser (data) {
    localStorage.setItem('auth_token', data.token);
    this.user = data.user;
    router.push('/');
  },

  _unsetUser () {
    localStorage.removeItem('auth_token');
    this.user = null;
    router.push('login');
  },

  init () {
    this.checkAuth();
  },

  login (creds) {
    return Vue.http.post('/api/login', creds)
      .then(res => this._setUser(res.body));
  },

  signup (userData) {
    return Vue.http.post('/api/sign-up', userData)
      .then(res => this._setUser(res.body));
  },

  logout () {
    this._unsetUser();
  },

  checkAuth () {
    const token = localStorage.getItem('auth_token');

    if (!token) {
      this._unsetUser();
      return Promise.resolve(null);
    }

    return Vue.http.post('/api/check-auth', { token })
      .then(({ data }) => {
        if (data.user) {
          this.user = data.user
        } else {
          this.user = null
        }

        return data
      })
  },

  authHeaderInterceptor (request, next) {
    const token = localStorage.getItem('auth_token');

    if (token) {
      request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('auth_token'));
    }

    next();
  }
};
