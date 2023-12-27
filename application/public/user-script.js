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
