
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
/* item submission logic*/

 var name = document.getElementById("name");
  var upc = document.getElementById("UPC");
  var image = document.getElementById("image");
  var bulk = document.getElementById("bulk");
  
  var submitBtn = document.getElementById("submit");
 if (submitBtn)
 {submitBtn.addEventListener("click", function(){createNewItem()});
 }
 function createNewItem(){
  var newItem = {
   title: name.value,
   upc: upc.value,
   image: image.value,
   bulk: bulk.value
  };
  // return a key for individual post
  var newItemKey = firebase.database().ref().child('items').push().key;
  // place in array in case multiple users/ new functionality are added in the future.
  var updates = {};
  updates['items/' + newItemKey] = newItem;
  //return updates to database
  return firebase.database().ref().update(updates);
}