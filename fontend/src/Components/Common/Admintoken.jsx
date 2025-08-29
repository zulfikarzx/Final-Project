export function token() {
    var  token = JSON.parse(localStorage.getItem('Admininfo'));
    return token.token;
  }

   export function Usertoken() {
    var  token = JSON.parse(localStorage.getItem('userinfo'));
    return token.token;
  }