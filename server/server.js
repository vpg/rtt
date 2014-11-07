/// NPM deps
var _http=       require('http');
var _express=    require('express');
var _bodyParser= require('body-parser');

/// RTT
var event_dd= require( './domains/tracking');
var evt_dd= new event_dd();

// Utils
var l= require('./logger');
/// App
var app = _express();
app.use(_express.static(__dirname + '/../www/'));
app.use(_bodyParser());

app.get('/', function(req,res) {
    console.log('One more connection');
  res.sendfile('../www/index.html');
});

var server= _http.createServer(app);
var io=   require('socket.io')(server);

/// Tracking xxx : move it out the server
io.on('connection', function (socket) {
    console.log('One more connection');
    socket.on('track:in', function (x) {
        console.log('track:in %s from %s by %s ', x.type,  x.element_x.code, x.client_x.user_agent_x.raw );
            console.log(x.client_x);
        //x.client_x.ip = socket.handshake.address.address;
        evt_dd.register( x.type, x.element_x, x.client_x, x.value, function (_event_x, err){ 
            io.sockets.emit('in:'+x.element_x.code, _event_x);
        });
    });
    socket.on('track:out', function (x) {
        console.log('track:out from %s ', x.element_x.code );
        io.sockets.emit('out:'+x.element_x.code, x);
    });
    socket.on('disconnect', function () {
        l.log("Socket disconnected");
    });

});

l.log('info', 'Up !');
server.listen(8080);
