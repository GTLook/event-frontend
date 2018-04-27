//use IIF to log in users
(() => {
  'use strict';

  // login form
  document.querySelector('.form-signin').addEventListener('submit', (event) => {
    event.preventDefault()

    const username = event.target.username.value
    const password = event.target.password.value

    request('/auth/token', 'post', { username , password })
    .then((response) => {
      document.querySelector('#loginError').classList.add('d-none')
      localStorage.setItem('token', response.data.token)
      window.location = '/data.html'
    })
    .catch((error) => {
      document.querySelector('#loginError').classList.remove('d-none')
    })
  })
})();

//show create User modal
document.querySelector('#createUserButton').addEventListener('click', (event) => {
  event.preventDefault()
  document.querySelector('#createUserModal').classList.remove('d-none')
  document.querySelector('#userSignIn').classList.add('d-none')
  document.querySelector('#modalFooterCreate').classList.add('d-none')
  document.querySelector('#modalFooterLogIn').classList.remove('d-none')
});

//show log in modal
document.querySelector('#backToLogInButton').addEventListener('click', (event) => {
  event.preventDefault()
  document.querySelector('#createUserModal').classList.add('d-none')
  document.querySelector('#userSignIn').classList.remove('d-none')
  document.querySelector('#modalFooterCreate').classList.remove('d-none')
  document.querySelector('#modalFooterLogIn').classList.add('d-none')
});

//create New User
document.querySelector("#createUserModal").addEventListener('submit', (event) => {
  event.preventDefault()

  const username = event.target.createUsername.value
  const password = event.target.createPassword.value

  request('/users', 'post', { username , password })
  .then((response) => {
    document.querySelector('#creationError').classList.add('d-none')
    document.querySelector('#creationSucsess').classList.remove('d-none')
  })
  .catch((error) => {
    document.querySelector('#creationError').classList.remove('d-none')
    document.querySelector('#creationSucsess').classList.add('d-none')
  })
});
