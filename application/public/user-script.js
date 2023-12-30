function inOrUp () {
  if (document.querySelector('.sign').innerHTML == 'Sign In') {
    document.querySelector('.signup-form-container').style.cssText =
      `display: flex;
      justify-content:center;
      align-items:center;
      flex-direction: column;`
    document.querySelector('.login-form-container').style.cssText =
      'display: none;'
    document.querySelector('.sign').innerHTML = 'Log In'
  } else {
    document.querySelector('.login-form-container').style.cssText =
    `display: flex;
    justify-content:center;
    align-items:center;
    flex-direction: column;`
    document.querySelector('.signup-form-container').style.cssText =
      'display: none;'
    document.querySelector('.sign').innerHTML = 'Sign In'
  }
}

function signUp () {
  const name = document.getElementById('name').value
  const email = document.getElementById('mail').value
  const password = document.getElementById('pass').value
  const userAvatar = document.querySelector('#pic')

  const formData = new FormData()
  formData.append('userAvatar', userAvatar.files[0])
  formData.append('name', name)
  formData.append('password', password)
  formData.append('email', email)

  // Url for the request
  let url = 'http://localhost:3000/users/signup'

  // Making our request
  fetch(url, {
    method: 'POST',
    body: formData
  })
    .then(result => {
      login(email, password)
    })
    .catch(errorMsg => {
      alert(errorMsg)
    })
}

function getCredentials() {
  const email = document.getElementById('smail').value
  const password = document.getElementById('spass').value
  login(email, password)
}

function login (email, password) {
  var status = 404

  // Url for the request
  let url = 'http://localhost:3000/users/signin'

  // Making our request
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
    .then(response => {
      status = response.status
      response.json().then(data => {
        if (status === 200) {
          document.cookie = 'access_token=' + data.token
          window.location.replace('/')
        } else {
          alert(data.message)
        }
      })
    })
    .catch(errorMsg => {
      alert(data.message)
    })
}
