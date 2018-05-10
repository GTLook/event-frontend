//define request
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
