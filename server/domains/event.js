/* Event DD
 * Domain Driven class
 */
var winston=    require('winston');
var _UASParser=  require('uas-parser');
require('../dbals/mongoose');
var event_m = require('../models/event');

var event_dd = function(){
    this.now_dt = new Date();
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
    var e = new event_m( event_x);
    e.save( function(err){
        if(err){
            winston.error('Failed to save evt : %s', err);
        }
    });
    winston.info('Saved evt : %s', _type);
    callback(e, null);
}


/** 
 * fetches all the event according to the given type which occured on the given element
 *
*/
event_dd.prototype.get_by_type_n_element = function ( _type_code, _element_id, callback){
    winston.info('event_dd:get_by_type_n_element %s : %s', _type_code, _element_id);
    event_m.find({type:_type_code, 'element_x.id':_element_id}, null, null, function( err, xs){
        if(err){
            winston.error('Failed to fetch metrics items : %s', err);
            callback( err, null);
        }
        winston.info('Found %s item(s)', xs.length);
        callback(null, xs);
    });
}

/**
 * fetches all the event according to the type which occured on the given element from the given datetime
 *  
 */
event_dd.prototype.get_by_type_n_element_from = function ( _type_code, _element_id, _from_dt, callback){
    winston.info('event_dd:get_by_type_n_element_from %s, %s, %s', _type_code, _element_id, _from_dt);
    var from_locale_dt = new Date(Date.parse(_from_dt));
    // xxx must improve this timezone hack
    var from_utc_dt =  new Date(from_locale_dt.getTime() + ( -120 * 60000));
    event_m.find({type:_type_code, 'element_x.id':_element_id, occured_on: { "$gte": from_utc_dt}}, null, null, function( err, xs){
        if(err){
            winston.error('Failed to fetch metrics items : %s', err);
            callback( err, null);
        }
        winston.info('Found %s item(s)', xs.length);
        callback(null, xs);
    });
}

event_dd.prototype.get_by_type_n_element_n_period = function ( _type_code, _element_id, _from_dt, _to_dt, callback){
    winston.info('event_dd:get_by_type_n_element_n_period %s, %s, %s, %s', _type_code, _element_id, _from_dt, _to_dt);
    var from_locale_dt = new Date(Date.parse(_from_dt));
    var to_locale_dt = new Date(Date.parse(_to_dt));
    // xxx must improve this timezone hack
    var from_utc_dt =  new Date(from_locale_dt.getTime() + ( -120 * 60000));
    var to_utc_dt =  new Date(to_locale_dt.getTime() + ( -120 * 60000));
    event_m.find({type:_type_code, 'element_x.id':_element_id, occured_on: { "$gte": from_utc_dt, "$lte":to_utc_dt}}, null, null, function( err, xs){
        if(err){
            winston.error('Failed to fetch metrics items : %s', err);
            callback( err, null);
        }
        winston.info('Found %s item(s)', xs.length);
        callback(null, xs);
    });
}

module.exports = event_dd;
