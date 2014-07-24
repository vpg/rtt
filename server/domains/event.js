/* Event DD
 * Domain Driven class
 */
var winston=    require('winston');
var UASParser=  require('uas-parser');
var extend = require('node.extend');
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
    var ua_x = UASParser.parse( _client_x.user_agent_x.raw);
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
 * fetches all heatmap clicks
 */
event_dd.prototype.get_heatmap_by_position = function ( _x, _y,  callback) {
  winston.info('event_dd:get_heatmap_by_position : %s / %s', _x, _y);
  event_m.find({type: "heatmap-" + _x + '/' + _y},  null, null, function( err, xs){
    if(err){
      winston.error('Failed to fetch metrics items : %s', err);
      callback( err, null);
    }
    winston.info('Found %s item(s)', xs.length);
    callback(null, xs);
  });
}

/**
 * fetches all the click events in the salesroom according to the given sale number
 */
event_dd.prototype.get_sales_click_by_number = function ( _number, callback) {
  winston.info('event_dd:get_sales_click_by_number : %s', _number);
  event_m.find({type: "salesroom-number-" + _number},  null, null, function( err, xs){
    if(err){
      winston.error('Failed to fetch metrics items : %s', err);
      callback( err, null);
    }
    winston.info('Found %s item(s)', xs.length);
    var response = { events_total_nb : xs.length, event_xs : xs};
    callback(null, response);
  });
}

/** 
 * fetches all the event according to the given type which occured on the given element
 *
*/
event_dd.prototype.get_by_type_n_element = function ( _type_code, _element_id, callback){
    winston.info('event_dd:get_by_type_n_element %s : %s', _type_code, _element_id);
    var query = {type:_type_code};
    /// Defines if element_id is either an id (MD5) or a code
    var criteria =  _element_id.match(/[0-9a-f]{32}/i) ? { 'element_x.id':_element_id} : { 'element_x.code':_element_id};
    extend( query, criteria);
    /// Exec query
    event_m.find( query, null, null, function( err, xs){
        if(err){
            winston.error('Failed to fetch metrics items : %s', err);
            callback( err, null);
        }
        winston.info('Found %s item(s)', xs.length);
        var response = { events_total_nb : xs.length, event_xs : xs};
        callback(null, response);
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
    var query = {type:_type_code, occured_on: { "$gte": from_utc_dt}};
    /// Defines if element_id is either an id (MD5) or a code
    var criteria =  _element_id.match(/[0-9a-f]{32}/i) ? { 'element_x.id':_element_id} : { 'element_x.code':_element_id};
    extend( query, criteria);
    /// Exec query
    event_m.find( query, null, null, function( err, xs){
        if(err){
            winston.error('Failed to fetch metrics items : %s', err);
            callback( err, null);
        }
        winston.info('Found %s item(s)', xs.length);
        var response = { events_total_nb : xs.length, event_xs : xs};
        callback(null, response);
    });
}

event_dd.prototype.get_by_type_n_element_n_period = function ( _type_code, _element_id, _from_dt, _to_dt, callback){
    winston.info('event_dd:get_by_type_n_element_n_period %s, %s, %s, %s', _type_code, _element_id, _from_dt, _to_dt);
    var from_locale_dt = new Date(Date.parse(_from_dt));
    var to_locale_dt = new Date(Date.parse(_to_dt));
    // xxx must improve this timezone hack
    var from_utc_dt =  new Date(from_locale_dt.getTime() + ( -120 * 60000));
    var to_utc_dt =  new Date(to_locale_dt.getTime() + ( -120 * 60000));
    var query = {type:_type_code, occured_on: { "$gte": from_utc_dt, "$lte":to_utc_dt}};
    /// Defines if element_id is either an id (MD5) or a code
    var criteria =  _element_id.match(/[0-9a-f]{32}/i) ? { 'element_x.id':_element_id} : { 'element_x.code':_element_id};
    extend( query, criteria);
    /// Exec query
    event_m.find( query, null, null, function( err, xs){
        if(err){
            winston.error('Failed to fetch metrics items : %s', err);
            callback( err, null);
        }
        winston.info('Found %s item(s)', xs.length);
        var response = { events_total_nb : xs.length, event_xs : xs};
        callback(null, response);
    });
}

event_dd.prototype.group_by_type_n_element = function ( _type_code, _element_id, _group, callback){
    winston.info('event_dd:group_by_type_n_element %s : %s', _type_code, _element_id);
    var query = {type:_type_code};
    /// Defines if element_id is either an id (MD5) or a code
    var criteria =  _element_id.match(/[0-9a-f]{32}/i) ? { 'element_x.id':_element_id} : { 'element_x.code':_element_id};
    extend( query, criteria);
    var group_key = '$' + _group
    event_m.aggregate( 
        [ 
            { $match: query}, 
            { $group: { _id: group_key, 'value':{'$first':group_key}, 'element_code':{'$first':'$element_x.code'}, 'total':{$sum:1}}},
            { $project: { 'element_code':1, 'value' :1, 'total':1, _id:0}}
        ], function( err, xs){
        if(err){
            winston.error('Failed to fetch metrics items : %s', err);
            callback( err, null);
        }
        winston.info('Found %s item(s)', xs.length);
        var response = { events_total_nb : xs.length, event_xs : xs};
        callback(null, response);
    });
}
event_dd.prototype.group_by_type_n_element_from = function ( _type_code, _element_id, _from_dt, _group, callback){
    winston.info('event_dd:group_by_type_n_element_from %s, %s, %s', _type_code, _element_id, _from_dt);
    var from_locale_dt = new Date(Date.parse(_from_dt));
    // xxx must improve this timezone hack
    var from_utc_dt =  new Date(from_locale_dt.getTime() + ( -120 * 60000));
    var query = {type:_type_code, occured_on: { "$gte": from_utc_dt}};
    /// Defines if element_id is either an id (MD5) or a code
    var criteria =  _element_id.match(/[0-9a-f]{32}/i) ? { 'element_x.id':_element_id} : { 'element_x.code':_element_id};
    extend( query, criteria);
    /// Exec query
    var group_key = '$' + _group
    event_m.aggregate( 
        [ 
            { $match: query}, 
            { $group: { _id: group_key, 'value':{'$first':group_key}, 'element_code':{'$first':'$element_x.code'}, 'total':{$sum:1}}},
            { $project: { 'element_code':1, 'value' :1, 'total':1, _id:0}}
        ], function( err, xs){
        if(err){
            winston.error('Failed to fetch metrics items : %s', err);
            callback( err, null);
        }
        winston.info('Found %s item(s)', xs.length);
        var response = { events_total_nb : xs.length, event_xs : xs};
        callback(null, response);
    });
}

event_dd.prototype.group_by_type_n_element_n_period = function ( _type_code, _element_id, _from_dt, _to_dt, _group, callback){
    winston.info('event_dd:group_by_type_n_element_n_period %s, %s, %s, %s', _type_code, _element_id, _from_dt, _to_dt);
    var from_locale_dt = new Date(Date.parse(_from_dt));
    var to_locale_dt = new Date(Date.parse(_to_dt));
    // xxx must improve this timezone hack
    var from_utc_dt =  new Date(from_locale_dt.getTime() + ( -120 * 60000));
    var to_utc_dt =  new Date(to_locale_dt.getTime() + ( -120 * 60000));
    var query = {type:_type_code, occured_on: { "$gte": from_utc_dt, "$lte":to_utc_dt}};
    /// Defines if element_id is either an id (MD5) or a code
    var criteria =  _element_id.match(/[0-9a-f]{32}/i) ? { 'element_x.id':_element_id} : { 'element_x.code':_element_id};
    extend( query, criteria);
    /// Exec query
    var group_key = '$' + _group
    event_m.aggregate( 
        [ 
            { $match: query}, 
            { $group: { _id: group_key, 'value':{'$first':group_key}, 'element_code':{'$first':'$element_x.code'}, 'total':{$sum:1}}},
            { $project: { 'element_code':1, 'value' :1, 'total':1, _id:0}}
        ], function( err, xs){
        if(err){
            winston.error('Failed to fetch metrics items : %s', err);
            callback( err, null);
        }
        winston.info('Found %s item(s)', xs.length);
        var response = { events_total_nb : xs.length, event_xs : xs};
        callback(null, response);
    });
}

module.exports = event_dd;
