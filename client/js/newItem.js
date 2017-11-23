/* item submission logic*/
    var editP;
     firebase.auth().onAuthStateChanged(function(user) {
var uid= user.uid;
var userRef = db.collection("Users").where("userID",  "==", uid);

userRef.get()
    .then(function(snapshot) {
        snapshot.forEach(function(doc) {
            editP= doc.data().editPermission;
            console.log(doc.data().storeID, " => ", doc.data())})});
     });
            
            
  var item = document.getElementById("name");
  var upc = document.getElementById("UPC");
  var image = document.getElementById("image");
  var bulk = document.getElementById("bulk");
  var productRef = db.collection("Product");
  console.log(item.value + upc.value + image.value + bulk.value);
  var submitBtn = document.getElementById("submit");
 if (submitBtn)
 {submitBtn.addEventListener("click", function(){createNewItem()});}
 function createNewItem(){
  // return a key for individual post

  
            if (editP){
            

productRef.add({
    bulk: bulk.value,
    upc: upc.value,
    imageLink: image.value,
    description: item.value})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
    window.setTimeout(function(){ window.location = "itemlist.html"; },1000);
    
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});
}
else {
    var alert = document.getElementById('alert');
    alert.innerHTML = "User is not permitted to create new item";
}
}
