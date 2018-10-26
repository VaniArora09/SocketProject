const express=require('express');
const app=express();
var http  = require('http');
var socketIO = require('socket.io');
var fs = require('fs');
var path = require('path');
var server,io;
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});
server = http.createServer(app);
server.listen(8040);

app.use(express.json());
const port = process.env.PORT || 8040;
server.listen(port, () => console.log(`The port is listening.. ${port}`));
 io = socketIO(server);

 io.on('connection', function (socket) {
//      var readStream = fs.createReadStream(path.resolve(__dirname, './test.jpeg'), {
//          encoding: 'binary'
//  });
//  var chunks=[];
//  var delay = 0;

//  readStream.on('readable', function (){
//      console.log('FILE LOADING');
//  });
//  readStream.on('data', function (chunk) {
//       delay = delay +3000;
//     setTimeout(function () {
//      chunks.push(chunk);
//      socket.emit('img-chunk', chunks);
//       }, delay);
//  });
//  readStream.on('end', function () {
//      console.log('FILE LOADED');
//  });
let readstream = fs.readFileSync(path.resolve(__dirname, "./it.jpeg"));
    let image64 = new Buffer(readstream).toString("base64");
    socket.emit('img-chunk', image64);
});
