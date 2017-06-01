var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");


var email = document.getElementById("email");
var password = document.getElementById("password");
var passwordVerify = document.getElementById("passwordVerify");
var store = document.getElementById("storeNumber");
var submit = document.getElementById("submit");
  submit.disabled = true; //default no submit without password
//var google = document.getElementById('google');
function pwCheck(){

  if (password.value != passwordVerify.value || password.value.length <1){
  password.style.background = 'red';
  passwordVerify.style.background = 'red';
  submit.disabled = true;
  }
  else {
     submit.disabled=false;
    password.style.background='green';
  passwordVerify.style.background= 'green';
  }
}

function emailCheck(){

  if (email.value.length <5 || !email.value.includes("@")){
  email.style.background = 'red';
  email.style.background = 'red';
  submit.disabled = true;
  }
  else {
     submit.disabled=false;
    email.style.background='green';
  email.style.background= 'green';
  }
}

function storeCheck(){
  
  if (store.value.length <1 || store.value.length>3 ){
  store.style.background = 'red';
  store.style.background = 'red';
  submit.disabled = true;
  }
  else {
     submit.disabled=false;
    store.style.background='green';
  store.style.background= 'green';
  }
}
    

submit.addEventListener("click", function() {createNewUser();});

function createNewUser() {
  var em = email.value;
  var pa = password.value;
  var pav = passwordVerify.value;
  var sto = store.value;

    
  var prom = true;
    
    firebase
      .auth()
      .createUserWithEmailAndPassword(em, pa)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        prom = false;
       
        if (errorCode == "auth/weak-password") {
          alert("The password is too weak.");
        } else {
          alert(errorCode + " " +errorMessage);
        }
      })
      if (prom){
      var newUser = {
      email: em,
      store: sto
    };
    // return a key for individual user
      var newUserKey = firebase.database().ref().child('users').push().key;
    var updates = {};
    updates["users/" + newUserKey] = newUser;
    //return updates to database
    
      alert("account created for" + em + "!!");
     return firebase.database.ref().update(updates);
      }
   
  } 

/*google.addEventListener("click", function(){createGoogleUser()});
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
*/
