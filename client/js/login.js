
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

submit.addEventListener("click", signIn, false);
function signIn(){
    

var em = email.value;
var pw = password.value;
firebase.auth().signInWithEmailAndPassword(em, pw).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  document.getElementsByClassName('smallText')[0].innerHTML =  errorMessage;
   document.getElementsByClassName('smallText')[0].style.color='rgb(220,220,14)';
   document.getElementsByClassName('smallText')[0].style.fontStyle="italic";
   
  
  
  // ...
});
}

//firebase__>
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    console.log("logged in");
    var userEmail = user.email;
    
    var greet =document.getElementById("greet");
    
    greet.innerHTML="Hello, " + userEmail;
    
    
   var elems= document.getElementsByClassName('formControl');
    for (var i=0;i<elems.length;i+=1){
  elems[i].style.display = 'none';
  
  document.getElementsByClassName('smallText')[0].style.visibility="hidden";
  
 
  
}
    // ...
  } else {
          document.getElementById('logoutNav').style.visibility ='hidden';
    // User is signed out.
    // ...
  }
});