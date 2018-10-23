import Vue from 'vue'
import router from '../router'

export default {
  user: null,

  _setUser: function (data) {
    localStorage.setItem('auth_token', data.token);
    this.user = data.user;
    router.push('/');
  },

  _unsetUser: function () {
    localStorage.removeItem('auth_token');
    this.user = null;
    router.push('login');
  },

  login (creds) {
    return Vue.http.post('/api/login', creds)
      .then(this._setUser.bind(this));
  },

  signup (userData) {
    return Vue.http.post('/api/sign-up', userData)
      .then(this._setUser.bind(this));
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
}
