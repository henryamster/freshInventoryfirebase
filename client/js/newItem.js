/* item submission logic*/

  var item = document.getElementById("name");
  var upc = document.getElementById("UPC");
  var image = document.getElementById("image");
  var bulk = document.getElementById("bulk");
  console.log(item.value + upc.value + image.value + bulk.value);
  var submitBtn = document.getElementById("submit");
 if (submitBtn)
 {submitBtn.addEventListener("click", function(){createNewItem()});}
 console.log(firebase.database().ref().child('items'));
 console.log(item.value + upc.value + image.value + bulk.value);
 function createNewItem(){
  var newItem = {
   name: item.value,
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