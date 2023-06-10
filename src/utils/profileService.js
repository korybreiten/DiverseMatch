import tokenService from './tokenService';

const BASE_URL = '/profile/'

export function addInterest(id){
  return fetch(`${BASE_URL}/interest/${id}`, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + tokenService.getToken()
    }
  }).then(res => res.json());
}

export function removeInterest(id){
  return fetch(`${BASE_URL}/interest/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + tokenService.getToken()
    }
  }).then(res => res.json());
}

export function addDislike(id){
  return fetch(`${BASE_URL}/dislike/${id}`, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + tokenService.getToken()
    }
  }).then(res => res.json());
}

export function removeDislike(id){
  return fetch(`${BASE_URL}/dislike/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + tokenService.getToken()
    }
  }).then(res => res.json());
}

export function getAllInterests() {
  return fetch(`${BASE_URL}/interests`, {
    headers: {
      'Authorization': 'Bearer ' + tokenService.getToken()
    }
  })
  .then(res => res.json());
}

export function getAllDislikes() {
  return fetch(`${BASE_URL}/dislikes`, {
    headers: {
      'Authorization': 'Bearer ' + tokenService.getToken()
    }
  })
  .then(res => res.json());
}

export function getMatches() {
  return fetch(`${BASE_URL}/matches`, {
    headers: {
      'Authorization': 'Bearer ' + tokenService.getToken()
    }
  })
  .then(res => res.json());
}

export default {
  addInterest,
  removeInterest,
  addDislike,
  removeDislike,
  getAllInterests,
  getAllDislikes,
  getMatches
}