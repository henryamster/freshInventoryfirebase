

function clearSearch(){
    document.getElementById('search').value = "";
}

function filterSearch(){
    var tableNode = document.getElementsByTagName("table")[0];
    while (tableNode.childNodes.length>2) {
    tableNode.removeChild(tableNode.firstChild);
}
   
   var search =  document.getElementById('search').value.toUpperCase();
   var itemsRef = firebase.database().ref('items/');
  itemsRef.orderByChild('name')
                
               .startAt(search)
                 .endAt(search+"\uf8ff")
                 
                 .once("value", function (snapshot){
                     
                     console.log(snapshot);
                  itemLoader(snapshot.val());   
            });
                 //  .startAt(search)
                 //.endAt(search+"\uf8ff")
/*query
  .orderByValue()
  .startAt(search).endAt(search)
  .on('value', function(snapshot) { 
      var result = snapshot.val();
      //do whatever you want.
      itemLoader(result);
  });*/
}


var itemsRef = firebase.database().ref('items/');
  //load items reference
itemsRef.limitToLast(40).on('value', function(snapshot) {
  itemLoader(snapshot.val())});
function itemLoader(snapshot){
   //load up each individual item
   for (var itemID in snapshot) {
    var itemIDRef = firebase.database().ref('items/' + itemID );
   // console.log(firebase.database().ref('items/' + itemID + '/name'));
    itemIDRef.on('value', function(snapshot){
     poster(snapshot.val())})
}
};
function poster(snapshot){
    console.log(snapshot.name + snapshot.image + snapshot.upc + snapshot.bulk);

var anchor = document.getElementsByTagName("table")[0];
//create tr
var tableRow = document.createElement("tr");

 if (snapshot.image){
var imageNode = document.createElement("img");
var imageTdNode = document.createElement('td');
  imageNode.src = snapshot.image;
  imageNode.className = "listImage";
  imageTdNode.appendChild(imageNode);
 }
 else{
     var imageTdNode = document.createElement('td');
 }


var nameNode = document.createElement("td");  
   nameNode.className = "itemName Tbl";
  var nameTextNode = document.createTextNode(snapshot.name);         
  nameNode.appendChild(nameTextNode);     

var upcNode = document.createElement("td");  
   upcNode.className = "upc Tbl";
  var upcTextNode = document.createTextNode(snapshot.upc);         
  upcNode.appendChild(upcTextNode);  
  
 var bulkNode = document.createElement("td");  
   bulkNode.className = "bulk Tbl";
  var bulkTextNode = document.createTextNode(snapshot.bulk);   
   if(snapshot.bulk == "true"){ bulkTextNode = "";}
  bulkNode.appendChild(bulkTextNode);   



  tableRow.appendChild(imageTdNode);

  tableRow.appendChild(nameNode);
  tableRow.appendChild(upcNode);
  tableRow.appendChild(bulkNode);


  if (snapshot.name){
  anchor.insertBefore(tableRow, anchor.firstChild)
  }
}

