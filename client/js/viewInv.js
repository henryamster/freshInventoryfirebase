var anchor = document.getElementsByTagName("table")[0];
var inventoryRef = db.collection("Inventory");

inventoryRef
    .get()
    .then(function(snapshot) {
        snapshot.forEach(function(doc) {
            console.log(doc.data().date, + doc.data().storeID +" => ", doc.data());
            
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });


   firebase.auth().onAuthStateChanged(function(user) {
while (anchor.firstChild.nextSibling) {
    anchor.removeChild(anchor.firstChild);
}
var uid= user.uid;
var userRef = db.collection("Users").where("userID",  "==", uid);
userRef.get()
    .then(function(snapshot) {
        snapshot.forEach(function(doc) {
            
            console.log(doc.data().storeID, " => ", doc.data())})});
            

console.log(stID);

    db.collection("Inventory").where("storeID", ">=", stID)
    .get()
    .then(function(snapshot) {
        snapshot.forEach(function(doc) {
            console.log(doc.id, " => ", doc.data());
            poster(doc);
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });


// retrieve items and display them in a table
function poster(doc){
    console.log(doc.data().description + doc.data().date + doc.data().storeID + doc.data().userID);


//create tr
var tableRow = document.createElement("tr");

 

var dateNode = document.createElement("td");  
   dateNode.className = "itemName Tbl";
  var dateTextNode = document.createTextNode(doc.data().date);         
  dateNode.appendChild(dateTextNode);     

var storeID = document.createElement("td");  
   storeID.className = "upc Tbl";
  var storeIDTextNode = document.createTextNode(doc.data().storeID);         
  storeID.appendChild(upcTextNode);  
  
 var userIDNode = document.createElement("td");  
   userIDNode.className = "bulk Tbl";
  var userIDTextNode = document.createTextNode(doc.data().bulk);   
   if(doc.data().bulk == "true"){ userIDTextNode = "";}
  userIDNode.appendChild(userIDTextNode);   
  


//append child nodes
  tableRow.appendChild(nameNode);
  tableRow.appendChild(storeID);
  tableRow.appendChild(userIDNode);

// Only post item if description is included
  if (doc.data().description){
  anchor.insertBefore(tableRow, anchor.firstChild.nextSibling)
  }
}

});