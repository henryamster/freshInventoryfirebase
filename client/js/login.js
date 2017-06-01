
var email = document.getElementById('email');
var password = document.getElementById('password');
var submit = document.getElementById('submit');


//manual emailcheck function
function emailCheck(){

  if (email.value.length <5 || !email.value.includes("@")){
  email.style.background = 'red';
  submit.disabled = true;
  }
  else {
     submit.disabled=false;
    email.style.background='green';
  }
}

//manual password function
function pwCheck(){

  if (password.value.length <1){
  password.style.background = 'red';
  submit.disabled = true;
  }
  else {
     submit.disabled=false;
    email.style.background='green';
  }
}

submit.addEventListener("click", function() {signIn();});
function signIn(){
    

var em = email.value;
var pw = password.value;
firebase.auth().signInWithEmailAndPassword(em, pw).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});
}