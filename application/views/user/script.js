function inOrUp() {
    if (document.querySelector('.sign').innerHTML == 'Sign In') {
        document.querySelector(".signup-form-container").style.cssText = "display: block;";
        document.querySelector(".login-form-container").style.cssText = "display: none;";
        document.querySelector('.sign').innerHTML = 'Log In'
        
    document.querySelector(".container").style.cssText = "background: linear-gradient(to bottom, rgb(56, 189, 149),  rgb(28, 139, 106));";
    } else {
        document.querySelector(".login-form-container").style.cssText = "display: block;";
        document.querySelector(".signup-form-container").style.cssText = "display: none;";
        document.querySelector('.sign').innerHTML = 'Sign In'

    document.querySelector(".container").style.cssText = "background: linear-gradient(to bottom, rgb(6, 108, 224),  rgb(14, 48, 122));";
    }
}