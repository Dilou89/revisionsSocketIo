var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use("/", express.static(__dirname + "/public"));

app.get('/', function(req, res){
  res.sendFile(__dirname + 'index.html');
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on('connection', function (socket) {
  var loggedUser;
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  /**
  * Connexion d'un utilisateur via le formulaire
  */
  socket.on('user-login', function (user) {
    console.log('user logged in : ' + user.username);
    loggedUser = user;
  });


  socket.on('chat message', function(msg){
    msg.username = loggedUser.username; // On intègre ici le nom d'utilisateur au message
    io.emit('chat-message', msg);
    console.log('Message de : ' + loggedUser.username);

  });



});
