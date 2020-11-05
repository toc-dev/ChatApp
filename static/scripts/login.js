// JavaScript source code
var username = document.forms['form']['username'];
var password = document.forms['form']['password'];

function validate() {
    var userName = username.value;
    var user = JSON.parse(localStorage.getItem(userName));
    if (user == null) {
        alert("Wrong username");
        return false;
    }
    var pw = user.password
    var isValid = password.value == pw;
    if (isValid) {
        alert('successfully logged in')
        sessionStorage.setItem('username', username.value)
        return true;
    } else {
        alert('Password is incorrect')
        return false;
    }

}