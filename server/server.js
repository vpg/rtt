/// NPM deps
var _http=       require('http');
var _express=    require('express');
var _bodyParser= require('body-parser');

/// 
var evt= require( './domains/event');
var evt_dd= new evt();

// Utils
var l= require('./logger');
/// App
var app = _express();
app.use(_express.static(__dirname + '/www'));
app.use(_bodyParser());


app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('RTT 0.1');
});

var server= _http.createServer(app);
l.log('info', 'Up !');
server.listen(8086);
