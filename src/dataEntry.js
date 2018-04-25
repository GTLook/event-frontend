// authe gate
request('/auth/token')
.then(function(response){
  // user is logged in
  document.querySelector('.user-id').innerHTML = response.data.id
})
.catch(function(error){
  // user is not logged in
  window.location = '/index.html'
})
