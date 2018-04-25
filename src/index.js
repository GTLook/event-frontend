//request from database to verfiy users
const request = (path, method = 'get', body = null) => {
  let bearerToken = ''
  const token = localStorage.getItem('token')

  if(token) bearerToken = `Bearer ${token}`

  return axios(`http://localhost:5000${path}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': bearerToken
    },
    data: body
  })
}

//use IIF to log in users
(() => {
  'use strict';

  request('/auth/token')
  .then((response) => {
    // user is authenticated
  })
  .catch((error) => {
    // user is not authenticated
  })



  // login form
  document.querySelector('.form-signin').addEventListener('submit', (event) => {
    event.preventDefault()

    const username = event.target.username.value
    const password = event.target.password.value

    request('/auth/token', 'post', { username , password })
    .then((response) => {
      document.querySelector('#loginError').classList.add('d-none')
      localStorage.setItem('token', response.data.token)
      window.location = '/Analytics.html'
    })
    .catch((error) => {
      document.querySelector('#loginError').classList.remove('d-none')
    })
  })
})();
