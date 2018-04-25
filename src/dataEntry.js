// authe gate, // user is logged in   // user is not logged in
request('/auth/token')
.then((response) => {document.querySelector('.user-id').innerHTML = response.data.id})
.catch((error) => { window.location = '/index.html' })
