/* RTT
 * RealTimeTracker
 * Client Side RTT class 
 */

var Rtt = function(){
    this.rtt_server= 'http://192.168.20.20:8086';
    this.socket=     io.connect( this.rtt_server);
    this.monitors= [];
    this.app= null;
    this.client_id= null;
}


Rtt.prototype.build_page_code= function(){
 return window.location.href;
}

/**
 * rtt.view sends a visit:in event type
 * Use case : a new visitor loads the current page
 */
Rtt.prototype.view= function (){
    var event_x = { 
        type: 'visit:in',
        element_x:  { 
                 application:   this.app,
                 protocol:      window.location.protocol,
                 domain:        window.location.host,
                 path:          window.location.pathname,
                 params:        window.location.search,
                 code:          this.build_page_code()
              },
        client_x:   {
                id:             this.client_id,
                user_agent:     navigator.userAgent,
              },
        value: 1
        };
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
    var event_x = { 
        type: 'visit:in',
        element_x:  { 
                 application:   this.app,
                 protocol:      window.location.protocol,
                 domain:        window.location.host,
                 path:          window.location.pathname,
                 params:        window.location.search,
                 code:          this.build_page_code()
              },
        client_x:   {
                id:             this.client_id,
                user_agent:     navigator.userAgent,
              },
        value: -1
        };
        this.socket.emit('track:out', event_x);
}

Rtt.prototype.monitor_visit= function( _element_code, _callback){
   this.monitors.push( { 
    element_code: _element_code,
    callback: _callback});
    console.log('adding %s monitor callback', _element_code);
}

var rtt = new Rtt(); 

/// Binding monitoring callbacks
rtt.socket.on('connect', function () {
    console.log('connect');
    rtt.monitors.forEach( function ( _x) {
       var c = 'in:'+ _x.element_code;
       console.log('Monitoring starts for %s', c);
       rtt.socket.on('in:' + _x.element_code, _x.callback); 
       rtt.socket.on('out:' + _x.element_code, _x.callback); 
    });
});
    
