var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");


var email = document.getElementById("email");
var password = document.getElementById("password");
var passwordVerify = document.getElementById("passwordVerify");
var store = document.getElementById("storeNumber");
var submit = document.getElementById("submit");
  submit.disabled = true; //default no submit without password
//var google = document.getElementById('google');

//manual password check function
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
//manual emailcheck function
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
//manual store number check function
function storeCheck(){
  var numberTest = /^([1-9][0-9]{0,2}|1000)$/;
  
  if (store.value.length <1 || store.value.length>3 || !numberTest.test(store.value)){
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
  
  firebase.auth().createUserWithEmailAndPassword(em,pa)
  .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
       
        if (errorCode == "auth/weak-password") {
          alert("The password is too weak.");
        } else {
          alert(errorCode + " " +errorMessage);
        }
      }).then(function(user){
  db.collection("Users").add({
    userID: user.uid,
    editPermission: false,
    storeID: sto,
    name:em}).then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);

      window.setTimeout(function(){ window.location = "index.html"; },1000);
    })
.catch(function(error) {
    console.error("Error adding document: ", error);
})
    
 })};


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
