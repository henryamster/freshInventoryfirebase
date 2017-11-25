var anchor = document.getElementsByTagName("table")[0];
var inventoryRef = db.collection("Inventory");

//var stID="";
var uid="";
var doc;

let authPromise = function(){
    return new Promise(function(resolve,reject){
   firebase.auth().onAuthStateChanged(function(user) {
var uid= user.uid; 
console.log(uid)
//if(uid!=""){
    resolve(uid);
//}
//else
//reject(uid);
})
    
});
};

   
  /* authPromise.then(function(output){uid=output;}).catch(function(output){
       console.log(output);
   })

*/

let userPromise = function(userid) {
   return new Promise(function(resolve,reject){
        window.setTimeout(function(){  
var userRef = db.collection("Users").where("userID",  "==", userid);
userRef.get()
    .then(function(snapshot) {
        snapshot.forEach(function(doc) {
            var stID= doc.data().storeID;
            console.log(doc.data().storeID, " => ", doc.data())})});
        },1000);     
//if (stID!="")
//{
resolve(stID);
 //  }
//else
///{reject(stID);}
//});
});}

/*
userPromise.then(function(output){
console.log(output);
stID=output;
}).catch(function(output){console.log(output)});
*/

let posterPromise = function(storeID){
    return new Promise(function(resolve,reject){
 window.setTimeout(function(){  
inventoryRef.where("storeID", "==", storeID)
    .get()
    .then(function(snapshot) {
        snapshot.forEach(function(doc) {
            console.log(doc.data().date, + doc.data().storeID +" => ", doc.data());
           // poster(doc);
            doc=doc;
            
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
},1000);
resolve(doc);
})
};
/*
posterPromise.then(function(output){
    console.log(output);
    poster(doc);
}).catch(function(output){
    console.log('posting error');
})
*/
authPromise()
.then(function(res){return userPromise(res)}).catch(function(){console.log('user')})
.then(function(res){return posterPromise(res)}).catch(function(){console.log('poster')})
.then(
    function(res){
        poster(res);
    });



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
  
 var liveNode = document.createElement("td");  
   liveNode.className = "bulk Tbl";
  var liveTextNode = document.createTextNode(doc.data().live);   
  liveNode.appendChild(liveTextNode);   
  


//append child nodes
  tableRow.appendChild(dateNode);
  tableRow.appendChild(storeID);
  tableRow.appendChild(liveNode);

// Only post item if description is included
  if (doc.data().storeID){
  anchor.appendChild(tableRow)
  }
}


/*OLDER VERSION 

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
  
 var liveNode = document.createElement("td");  
   liveNode.className = "bulk Tbl";
  var liveTextNode = document.createTextNode(doc.data().live);   
  liveNode.appendChild(liveTextNode);   
  


//append child nodes
  tableRow.appendChild(dateNode);
  tableRow.appendChild(storeID);
  tableRow.appendChild(liveNode);

// Only post item if description is included
  if (doc.data().storeID){
  anchor.insertBefore(tableRow, anchor.firstChild.nextSibling)
  }
}

}
);
*/