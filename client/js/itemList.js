function clearSearch(){
    document.getElementById('search').value = "";
}

function filterSearch(){
    var tableNode = document.getElementsByTagName("table")[0];
    while (tableNode.hasChildNodes()) {
    tableNode.removeChild(tableNode.lastChild);
}
   
   var search =  document.getElementById('search').value;
   var itemsRef = firebase.database().ref('items/');
  itemsRef.orderByChild('name')
                 .startAt(search)
                 .endAt(search+"\uf8ff")
                 .on("value", function (snapshot){
                     console.log(snapshot);
                  itemLoader(snapshot);   
                 });
                 
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
  //load blogposts
itemsRef.limitToLast(40).on('value', function(snapshot) {
  itemLoader(snapshot.val())});
function itemLoader(snapshot){
   //load up each individual blogpost snapshot, with ID values
   for (var itemID in snapshot) {
    var itemIDRef = firebase.database().ref('items/' + itemID);
    itemIDRef.on('value', function(snapshot){
     poster(snapshot.val())})
}
};
function poster(snapshot){
    

var art = document.getElementsByTagName("table")[0];
//create tr
var artic = document.createElement("tr");

 if (snapshot.image.length >0){
var imageNode = document.createElement("img");
var imageTdNode = document.createElement('td');
  imageNode.src = snapshot.image;
  imageNode.className = "listImage";
  imageTdNode.appendChild(imageNode);
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
   if(!snapshot.bulk){ bulkTextNode = "";}
  bulkNode.appendChild(bulkTextNode);   




  artic.appendChild(imageTdNode);
  artic.appendChild(nameNode);
  artic.appendChild(upcNode);
  artic.appendChild(bulkNode);


  if (snapshot.name.length>0){
  art.insertBefore(artic, art.firstChild)
  }
}