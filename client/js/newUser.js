var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');


var email = document.getElementById('email');
var password = document.getElementById('password');
//var store = document.getElementById('storeNumber');
var submit = document.getElementById('submit');
//var google = document.getElementById('google');

submit.addEventListener("click", function(){createNewUser()});

function createNewUser(){
firebase.auth().createUserWithEmailAndPassword(email.value, password.value).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
})};

google.addEventListener("click", function(){createGoogleUser()});
function createGoogleUser(){
firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
})};

