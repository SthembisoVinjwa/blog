function inOrUp () {
  if (document.querySelector('.sign').innerHTML == 'Sign In') {
    document.querySelector('.signup-form-container').style.cssText =
      'display: block;'
    document.querySelector('.login-form-container').style.cssText =
      'display: none;'
    document.querySelector('.sign').innerHTML = 'Log In'
  } else {
    document.querySelector('.login-form-container').style.cssText =
      'display: block;'
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
      console.log(result)
    })
    .catch(errorMsg => {
      console.log(errorMsg)
    })
}

function login () {
  const email = document.getElementById('smail').value
  const password = document.getElementById('spass').value

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
    .then(response => response.json())
    .then(data => {
      console.log(data)
      document.cookie='access_token=' + data.token
    })
    .catch(errorMsg => {
      console.log(errorMsg)
    })
}
