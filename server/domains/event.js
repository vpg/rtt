/* Event DD
 * Domain Driven class
 */
var winston=    require('winston');
var _UASParser=  require('uas-parser');
require('../dbals/mongoose');
var model = require('../models/event');

var event_dd = function(){
}

/**
 *  
 */
event_dd.prototype.register = function ( _type, _element_x, _client_x, _value, callback){
    winston.info('register event  %s : %s', _type, _client_x.user_agent_x.raw);
    /// xxx Check params
    var ua_x = _UASParser.parse( _client_x.user_agent_x.raw);
    console.log( ua_x);
    var event_x = {
        type:      _type,
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
    var e = new model( event_x);
    e.save( function(err){
        if(err){
            winston.error('Failed to save evt : %s', err);
        }
    });
    winston.info('Saved evt : %s', _type);
    callback(e, null);
}


module.exports = event_dd;
