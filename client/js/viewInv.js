var anchor = document.getElementsByTagName("table")[0];
var inventoryRef = db.collection("Inventory");
 var stID=161;
inventoryRef
    .get()
    .then(function(snapshot) {
        snapshot.forEach(function(doc) {
            console.log(doc.data().date, + doc.data().storeID +" => ", doc.data());
            poster(doc);
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

/*
   firebase.auth().onAuthStateChanged(function(user) {
while (anchor.firstChild) {
    anchor.removeChild(anchor.firstChild);
}
var uid= user.uid;
var userRef = db.collection("Users").where("userID",  "==", uid);

userRef.get()
    .then(function(snapshot) {
        snapshot.forEach(function(doc) {
            stID= doc.data().storeID;
            console.log(stID);
            console.log(doc.data().storeID, " => ", doc.data())})});
            
*/

/*console.log(stID);
    inventoryRef.where("storeID", "<=", stID).get()
    .then(function(snapshot) {
        snapshot.forEach(function(doc) {
            console.log(doc.id, " => ", doc.data());
            poster(doc);
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
*/

// retrieve items and display them in a table
function poster(doc){
    console.log( doc.data().date + doc.data().storeID + doc.data().userId);


//create tr
var tableRow = document.createElement("tr");

 

var dateNode = document.createElement("td");  
 var link = document.createElement('a');
 link.setAttribute('href', '/viewinventory.html?' + doc.data().storeID + doc.data().date);
   dateNode.className = "itemName Tbl";
  var dateTextNode = document.createTextNode(doc.data().date);   
  link.appendChild(dateTextNode);
  dateNode.appendChild(link);     





var storeID = document.createElement("td");  
   storeID.className = "upc Tbl";
  var storeIDTextNode = document.createTextNode(doc.data().storeID);         
  storeID.appendChild(storeIDTextNode);  
  
 var userIDNode = document.createElement("td");  
   userIDNode.className = "bulk Tbl";
  var userIDTextNode = document.createTextNode(doc.data().userId);   
  userIDNode.appendChild(userIDTextNode);   
  


//append child nodes
  tableRow.appendChild(dateNode);
  tableRow.appendChild(storeID);
  tableRow.appendChild(userIDNode);

// Only post item if description is included
  if (doc.data().storeID){
  anchor.insertBefore(tableRow, anchor.firstChild.nextSibling)
  }
}

//});