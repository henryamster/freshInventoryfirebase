var anchor = document.getElementsByTagName("table")[0];
var stID;
   firebase.auth().onAuthStateChanged(function(user) {
var uid= user.uid;
var userRef = db.collection("Users").where("userID",  "==", uid);

userRef.get()
    .then(function(snapshot) {
        snapshot.forEach(function(doc) {
            stID= doc.data().storeID;
            console.log(doc.data().storeID, " => ", doc.data())})});
            



   var inventoryRef = db.collection("Inventory");
 window.setTimeout(function(){  
inventoryRef.where("storeID", "==", stID)
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
console.log(stID);
},1000);
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

}
);