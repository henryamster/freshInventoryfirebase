var anchor = document.getElementsByTagName("table")[0];
var productRef = db.collection("Product");
productRef
    .get()
    .then(function(snapshot) {
        snapshot.forEach(function(doc) {
            console.log(doc.id, + doc.upc +" => ", doc.data());
            
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });




function clearSearch(){
    document.getElementById('search').value = "";
}



function filterSearch(){
    var search =  document.getElementById('search').value;
    
while (anchor.firstChild) {
    anchor.removeChild(anchor.firstChild);
}
    
    db.collection("Product").where("description", ">=", search)
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
}

// retrieve items and display them in a table
function poster(doc){
    console.log(doc.data().description + doc.data().image + doc.data().upc + doc.data().bulk);


//create tr
var tableRow = document.createElement("tr");

 if (doc.data().imageLink){
var imageNode = document.createElement("img");
var imageTdNode = document.createElement('td');
  imageNode.src = doc.data().imageLink;
  imageNode.className = "listImage";
  imageTdNode.appendChild(imageNode);
 }
 else{
     var imageTdNode = document.createElement('td');
 }


var nameNode = document.createElement("td");  
   nameNode.className = "itemName Tbl";
  var nameTextNode = document.createTextNode(doc.data().description);         
  nameNode.appendChild(nameTextNode);     

var upcNode = document.createElement("td");  
   upcNode.className = "upc Tbl";
  var upcTextNode = document.createTextNode(doc.data().upc);         
  upcNode.appendChild(upcTextNode);  
  
 var bulkNode = document.createElement("td");  
   bulkNode.className = "bulk Tbl";
  var bulkTextNode = document.createTextNode(doc.data().bulk);   
   if(doc.data().bulk == "true"){ bulkTextNode = "";}
  bulkNode.appendChild(bulkTextNode);   
  


//append child nodes
  tableRow.appendChild(imageTdNode);
  tableRow.appendChild(nameNode);
  tableRow.appendChild(upcNode);
  tableRow.appendChild(bulkNode);

// Only post item if description is included
  if (doc.data().description){
  anchor.insertBefore(tableRow, anchor.firstChild)
  }
}

