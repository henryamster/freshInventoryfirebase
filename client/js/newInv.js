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

var qtyNode = document.createElement("td");  
  qtyNode.className = "upc Tbl";
  var qtyTextNode = document.createTextNode("2");         
  qtyNode.appendChild(qtyTextNode);  
  
 var bulkNode = document.createElement("td");  
   bulkNode.className = "bulk Tbl";
  var bulkTextNode = document.createTextNode(doc.data().bulk);   
   if(doc.data().bulk == "true"){ bulkTextNode = "True";}
  bulkNode.appendChild(bulkTextNode);   
   
   
   //minusFiveNode
    var adjustmentNode = document.createElement('td');
  adjustmentNode.className = "Adjustment Tbl";
  
  var minusFive = document.createElement('button');
  minusFive.className="qtyButton minusFive";
  var minusFiveTextNode = document.createTextNode("-5");
  minusFive.onclick = function(){//minusFive(INVENTORYLINE)};
  }
  minusFive.appendChild(minusFiveTextNode)
  
  var minusOne = document.createElement('button');
  minusOne.className="qtyButton minusOne";
  var minusOneTextNode = document.createTextNode("-1");
  minusOne.onclick = function(){//minusOne(INVENTORYLINE)};
  }
  minusOne.appendChild(minusOneTextNode)
  
  var plusOne = document.createElement('button');
  plusOne.className="qtyButton plusOne";
  var plusOneTextNode = document.createTextNode("+1");
  plusOne.onclick = function(){//plusOne(INVENTORYLINE)};
  }
  plusOne.appendChild(plusOneTextNode)
  
  var plusFive = document.createElement('button');
  plusFive.className="qtyButton plusFive";
  var plusFiveTextNode = document.createTextNode("+5");
  plusFive.onclick = function(){//plusFive(INVENTORYLINE)};
  }
  plusFive.appendChild(plusFiveTextNode)
  
  
  adjustmentNode.appendChild(minusFive);
  adjustmentNode.appendChild(minusOne);
  adjustmentNode.appendChild(plusOne);
  adjustmentNode.appendChild(plusFive);




//append child nodes
 tableRow.appendChild(imageTdNode);
  tableRow.appendChild(nameNode);
  tableRow.appendChild(bulkNode);
  tableRow.appendChild(qtyNode);
  tableRow.appendChild(adjustmentNode);

// Only post item if description is included
  if (doc.data().description){
  anchor.insertBefore(tableRow, anchor.firstChild)
  }
}

