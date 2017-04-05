var socket = io();

$('#chat form').submit(function(e){
  e.preventDefault();
  var message = {
    text : $('#m').val()
  }
  $('#m').val('');
  socket.emit('chat message', message);
  $('#chat input').focus();
});

socket.on('chat-message', function(message){
  console.log(message.username);
  $('#messages').append($('<li>').html('<span class="username">' + message.username + '</span>' + message.text));
})


/**
* Connexion d'un utilisateur
*/
$('#login form').submit(function (e) {
  e.preventDefault();
  var user = {
    username : $('#login input').val().trim()
  };
  if (user.username.length > 0) { // Si le champ de connexion n'est pas vide
  socket.emit('user-login', user);
  $('body').removeAttr('id'); // Cache formulaire de connexion
  $('#chat input').focus(); // Focus sur le champ du message
}
});
