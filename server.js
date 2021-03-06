var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, "./static")));
app.set('views',path.join(__dirname, './views'));
app.set('view engine', 'ejs');



app.get('/',function (req ,res) {
	res.render('index');
})



var server = app.listen(parseInt(process.env.PORT || 8000));
var io = require('socket.io').listen(server);




//--socket--//

io.sockets.on('connection', function (socket) {

//chat
	socket.on("send-chat", function(message){
		io.emit("chat-sent", message);
	});


//drawingboard
	socket.on("onMouseDown", function(color, width, mode){
		io.emit("gotMouseDown", color, width, mode);
	});

	socket.on("onMouseDrag", function(data){
		io.emit("gotMouseDrag", data);
	});

	socket.on("clearingScreen", function(){
		io.emit("gotClear");
	});

	socket.on("onPreload", function(){
		socket.broadcast.emit("gotLoad")
	});

	socket.on("onSerial", function(ser){
		socket.broadcast.emit("gotSerial", ser)
	});

});

