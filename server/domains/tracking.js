/* Tracking Domain
 * Domain Driven class
 */
var winston=    require('winston');
var UASParser=  require('uas-parser');
var extend = require('node.extend');


var es_client= require( '../dbals/elasticsearch');

var tracking_dd = function(){
    this.now_dt = new Date();
}

/**
 *  
 */
tracking_dd.prototype.register = function ( _type, _element_x, _client_x, _value, callback){
    winston.info('register event  %s : %s', _type, _client_x.user_agent_x.raw);
    /// xxx Check params
    var ua_x = UASParser.parse( _client_x.user_agent_x.raw);
    console.log( ua_x);
    var x = {
        index: 'rtt',
        type: _type,
        body: {
            element_x: _element_x,
            client_x:  {
                id: _client_x.id,
                ip: _client_x.ip,
                user_agent_x:  {
                        raw:    _client_x.user_agent_x.raw,
                        client:   ua_x.type,
                        name:   ua_x.uaName,
                        os:     ua_x.osFamily,
                        device: ua_x.deviceType
                    },
                },
            value:     _value
        }
    }
    es_client.index(x, function(err, resp){
        if(err){
            winston.error('Failed to save evt : %s', err);
        }
        console.log(resp);
    });

    
    
    /*
    var e = new event_m( event_x);
    e.save( function(err){
        if(err){
            winston.error('Failed to save evt : %s', err);
        }
    });
    */
    winston.info('Saved evt : %s', _type);
    callback(x, null);
}



module.exports = tracking_dd;
