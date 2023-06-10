import tokenService from './tokenService';

const BASE_URL = '/topics/'

export function create(formData) {
  return fetch(BASE_URL + 'create', {
      method: 'POST',
      headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + tokenService.getToken()
          }),
      body: JSON.stringify(formData)
  })
  .then(res => {
      if (res.ok) return res.json();
      throw new Error('Create Topic Error!');
  })
}

export function search(formData){
  return fetch(BASE_URL + 'search/' + formData.keyword, {
    method: 'POST',
    headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + tokenService.getToken()
        }),
    body: JSON.stringify(formData)
})
.then(res => {
    if (res.ok) return res.json();
    throw new Error('Create Topic Error!');
})
}

export function removeTopic(id){
  return fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: {
          'Authorization': 'Bearer ' + tokenService.getToken()
        }
  }).then(res => res.json());
}


export function getAllTopics(){
  return fetch(BASE_URL + 'all', {
      method: 'GET'
  }).then(res => {
      if(res.ok) return res.json()
      throw new Error('Get Topics Error!')
  })
}

export function getUserTopics(id) {
  return fetch(BASE_URL + 'user/' + id, {
    method: 'GET'
  }).then(res => {
      if(res.ok) return res.json()
      throw new Error('Get Topics Error!')
  })
}

export default {
  create,
  search,
  removeTopic,
  getAllTopics,
  getUserTopics
}