import tokenService from './tokenService';

const BASE_URL = '/users/';

export function join(creds) {
  return fetch(BASE_URL + 'join', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(creds)
  })
  .then(res => {
    if (res.ok) {
      console.log('Sign Up Success!')
      return res.json();
    } else {
      throw new Error('Sign Up Error!');
    };
  })
  .then(({token}) => tokenService.setToken(token));
}

export function login(creds) {
  return fetch(BASE_URL + 'login', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(creds)
  })
  .then((res) => {
    if (res.ok) {
      console.log('Log In Success!')
      return res.json();
    } else {
      throw new Error('Invalid Credentials!');
    };
  })
  .then(({token}) => tokenService.setToken(token));
}

export function logout() {
  tokenService.removeToken();
}

export function getToken() {
  return tokenService.getUserFromToken();
}

export function getUsername(formData) {
  return fetch(BASE_URL + 'username/' + formData.username, {
      method: 'GET'
  })
  .then(res => {
      if (res.ok) return res.json();
      throw new Error('Get User Error!');
  })
}

export default {
  join,
  login,
  getToken,
  getUsername,
  logout
};