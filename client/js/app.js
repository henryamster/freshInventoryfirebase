
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCBNzlAWE4xyJ9YdYRymo7WEgY1gxOVhcE",
    authDomain: "fresh-inventory.firebaseapp.com",
    databaseURL: "https://fresh-inventory.firebaseio.com",
    projectId: "fresh-inventory",
    storageBucket: "fresh-inventory.appspot.com",
    messagingSenderId: "566408288574"
  };
  firebase.initializeApp(config);
  var itemsRef = firebase.database().ref('items/');
  var usersRef = firebase.database().ref('users/');
  var navVisible=false;
 
 //vanilla menu manipulation 
  var btn = document.getElementById('navBtn')
  if(btn){
  btn.onclick = function() {
       var items = document.getElementsByClassName('navItem');
      if (!navVisible){
    [].forEach.call(items, function (item) {
        item.style.display = "block";
    });
    navVisible = true;}
    else {
        [].forEach.call(items, function (item) {
        item.style.display = "none";
         navVisible = false;
    });
    }
    
    //ensure buttons visible at all times
    window.onresize = function(event) {
        if(!navVisible){
    btn.click();
            [].forEach.call(items, function (item) {
        item.style.display = "inline-block";
    });
        }
};
    
}
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
  
  document.getElementsByClassName('smallText')[0].style.display="none";
  
 
  
}
    // ...
  } else {
          document.getElementById('logoutNav').style.display='none';
    // User is signed out.
    // ...
  }
});

 function logOut(){
       firebase.auth().signOut();
       console.log("signed out");
  }
