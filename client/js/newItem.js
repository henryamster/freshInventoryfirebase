/* item submission logic*/

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

productRef.add({
    bulk: bulk.value,
    upc: upc.value,
    imageLink: image.value,
    description: item.value})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});
}
