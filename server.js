
// requires
var app = require('express')()
	, server = require('http').createServer(app)
	, io = require('socket.io').listen(server)
	, express = require('express');

var USEDIPADRESS = 'remote';

var ipAdress = {
	local : '127.0.0.1',
	remote :  '192.168.0.3'
};

// set port
server.listen(9191, ipAdress[USEDIPADRESS]);

// static directory - like for stylesheet
app.use(express.static(__dirname + '/'));

// get requests
app.get('/', function (req, res) {
	res.sendfile(__dirname + '/index.html');
});


// start socket.io
io.sockets.on('connection', function (socket) {
	
		

		socket.broadcast.emit('newplayer');
		
		
		socket.on('joined', function(name){
			socket.broadcast.emit('addplayer');
		});


});

