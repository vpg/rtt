/* Event DD
 * Domain Driven class
 */
var winston=    require('winston');
require('../dbals/mongoose');
var model = require('../models/event');

var event_dd = function(){
}

/**
 *  
 */
event_dd.prototype.register = function ( _type, _element_x, _client_x, _value, callback){
    winston.info('register event  %s : %s', _type, _element_x.raw);
    /// Check params
    var e = new model();
    e.type=      _type;
    e.element_x= _element_x;
    e.client_x=  _client_x;
    e.value=     _value;
    e.save( function(err){
        if(err){
            winston.error('Failed to save evt : %s', err);
        }
    });
    winston.info('Saved evt : %s', _type);
    callback(e, null);
}


module.exports = event_dd;
