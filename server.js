var http = require('http');
var path = require('path');
var express = require('express');

var router = express();
var server = http.createServer(router);
var app = express();

app.use(express.static('client'));

//app.get('/', function(req, res){
   // res.sendfile(__dirname + '/client/index.html');
//});


app.listen(process.env.PORT, process.env.IP);

console.log("Server running at ", process.env.IP + ":" + process.env.PORT);

