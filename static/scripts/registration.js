// JavaScript source code
//call the nested list username in form and store in the var username
//form is a list, username is another list
var username = document.forms['form']['username'];
var password = document.forms['form']['password'];
var confirm_password = document.forms['form']['confirm_password'];

var username_error = document.getElementById('username_error');
var password_error = document.getElementById('password_error');


username.addEventListener('textInput', username_Verify);
password.addEventListener('textInput', password_Verify);

function validated() {
    if (username.value.length < 4) {
        username.style.border = "1px solid red";
        username_error.style.display = "block";
        username.focus();
        return false;
    }
    if (password.value.length < 6) {
        password.style.border = "1px solid red";
        password_error.style.display = "block";
        password.focus();
        return false;
    }
    if (confirm_password.value !== password.value) {
        confirm_password.style.border = "1px solid red";
        c_password_error.style.display = "block";
        confirm_password.focus();
        return false;
    }
    //obtain the username object from LS and store in the var, value
    var value = localStorage.getItem(username.value);
    var userExists = value != null;
    if (userExists) {
        alert('This username is already taken!')
        return false;
    } else {
        var userPassword = password.value;
        var user = { 'password': userPassword};
        localStorage.setItem(username.value, JSON.stringify(user));
        //localStorage.setItem('password', password.value);
        alert('Your account has been created');
        return true;
    }

}
function username_Verify() {
    if (username.value.length >= 3) {
        username.style.border = "1px solid silver";
        username_error.style.display = "none";
        return true;
    }
}
function password_Verify() {
    if (password.value.length >= 8) {
        password.style.border = "1px solid silver";
        password_error.style.display = "none";
        return true;
    }
}