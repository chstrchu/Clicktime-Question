var app = require('express')();
var http = require('http').Server(app)
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile("/Users/chesterchu/Desktop/computer_science/Clicktime-Question" + "/clicktime_question1.html");
});

// names of users currently connected
var usernames = {};

io.on('connection', function(socket){
	
	socket.on('welcome', function(username) {
		//connection established, start using socket
		socket.username = username;
		usernames[username] = username;
		io.emit('updateusers', usernames);
		console.log('socket ready');
		//console.log(usernames[username]);
	});
	
	socket.on('disconnect', function(){
	    //user has disconnected
	    delete usernames[socket.username];
	    io.emit('updateusers', usernames);	
	});
	
	socket.on('message', function(data){
		//socket.emit('message', 'data sent');
		io.emit('message', data);
	});
	
	socket.on('heartbeat', function(){
		//make sure connection is receiving events correctly
		var timer = setInterval(function() {myTimer()}, 30000);
		function myTimer() {
			io.emit('heartbeat');
		};
	});
	
	socket.on('error', function(err) {
		//things go wrong
		var type = err.type //error type
		var message = err.message; //friendly message describing error
		
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});