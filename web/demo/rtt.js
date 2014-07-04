/* RTT
 * RealTimeTracker
 * Client Side RTT class 
 */

var Rtt = function(){
    this.rtt_server= 'http://192.168.150.57:8086';
    this.socket=     io.connect( this.rtt_server);
    this.monitors= [];
    this.app= null;
    this.client_id= null;
}


Rtt.prototype.build_view_code= function(){
 return window.location.href;
}
Rtt.prototype.build_click_code= function( _dom_element_id){
 return this.build_view_code() + ':' + _dom_element_id;
}

Rtt.prototype.build_event_x= function( _type, _code, _value){
    var event_x = { 
        type: _type,
        element_x:  { 
                 application:   this.app,
                 protocol:      window.location.protocol,
                 domain:        window.location.host,
                 path:          window.location.pathname,
                 params:        window.location.search,
                 code:          _code
              },
        client_x:   {
                id:             this.client_id,
                user_agent_x:   {
                    raw: navigator.userAgent,
                },
        },
        value: _value
        };
        console.log( event_x);
    return event_x;
}


/**
 * rtt.view sends a visit:in event type
 * Use case : a new visitor loads the current page
 */
Rtt.prototype.view= function (){
    var event_x = this.build_event_x( 'visit:in', this.build_view_code(), 1);
    this.socket.emit('track:in', event_x);
    /* xxx
    window.onbeforeunload = function (e){
        event_x.value= -1;
        this.socket.emit('track:out', event_x);
    }
    */
}
/**
 * rtt.leave sends a visit:in event type
 * Use case : a new visitor leaves the current page
 */
Rtt.prototype.leave= function (){
    var event_x = this.build_event_x( 'visit:in', this.build_view_code(), -1);
    this.socket.emit('track:out', event_x);
}

Rtt.prototype.click= function ( _dom_element_id){
    var event_x = this.build_event_x( 'click', this.build_click_code( _dom_element_id), 1);
    this.socket.emit('track:in', event_x);
}

Rtt.prototype.monitor= function( _element_code, _callback){
   this.monitors.push( { 
    element_code: _element_code,
    callback: _callback});
    console.log('adding %s monitor callback', _element_code);
}

var rtt = new Rtt(); 

/// Binding monitoring callbacks
rtt.socket.on('connect', function (socket) {
   //socket.broadcast.emit('rtt_ping:'+rtt.build_page_code(), {element_x: { code: rtt.build_page_code()}});
   //rtt.socket.on('rtt_ping:'+ rtt.build_page_code(), function(){
   //    console.log('Get ping Send pong %s', 'ping:'+ rtt.build_page_code());
   //    rtt.socket.emit('rtt_pong',  { element_x : { code : _x.element_x.code}, value : 1});
   //});
   //rtt.socket.emit('rtt_ping', {element_x: { code: rtt.build_page_code()}});
   //rtt.socket.on('rtt_ping:'+ rtt.build_page_code(), function(){
   //    console.log('Get ping Send pong %s', 'ping:'+ rtt.build_page_code());
   //    rtt.socket.emit('rtt_pong',  { element_x : { code : _x.element_x.code}, value : 1});
   //});
    rtt.monitors.forEach( function ( _x) {
        var c = 'in:'+ _x.element_code;
        console.log('Monitoring starts for %s', c);
        rtt.socket.on('in:' + _x.element_code, _x.callback); 
        rtt.socket.on('out:' + _x.element_code, _x.callback); 
       //rtt.socket.on('rtt_pong:' + _x.element_code, function( _pong_x){
       //    console.log('Get pong %s', _pong_x.element_x.code);
       //    _x.callback( _pong_x); 
       //});
    });
});
    
