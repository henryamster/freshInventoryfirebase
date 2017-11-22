
 const config = {
    apiKey: "AIzaSyAMv--lZ8FEHMUb02QtswpuuTTVGd18cfI",
    authDomain: "inv-1d9af.firebaseapp.com",
    databaseURL: "https://inv-1d9af.firebaseio.com",
    projectId: "inv-1d9af",
    storageBucket: "inv-1d9af.appspot.com",
    messagingSenderId: "761139474826"
  };
  
firebase.initializeApp(config);


  //Initialize Firestore DB
var db = firebase.firestore();


//OLD STUFF

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

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    
    var userEmail = user.email;
    if(navVisible){
       document.getElementsByTagName('nav')[0].style.display = "block";
      document.getElementById('logoutNav').style.display ='inline-block';
      
    }
    // ...
  } else {
      document.getElementsByTagName('nav')[0].style.display = "none";
          document.getElementById('logoutNav').style.display ='none';}
})



 function logOut(){
       firebase.auth().signOut();
       console.log("signed out");
  }
