/* Event DD
 * Domain Driven class
 */
var winston=    require('winston');
require('../dbals/mongoose');
var model = require('../models/event');

var evt_dd = function(){
}

/**
 *  
 */
evt_dd.prototype.register = function ( _category, _type, _code, _subject_type, _subject_id, _subject_lbl, _subject_raw, callback){
    winston.info('register event  %s : %s', _code, _subject_lbl);
    /// Check params
    var e = new model();
    e.category=  _category;
    e.code=      _code;
    e.type=      _type;
       e.subject_x.type= _subject_type;
       e.subject_x.id=   _subject_id;
       e.subject_x.lbl=  _subject_lbl;
       e.subject_x.raw=  _subject_raw;
    e.save( function(err){
        if(err){
            winston.error('Failed to save evt : %s', err);
        }
    });
    winston.info('Saved evt : %s', _code);
    callback(e, null);
}


module.exports = evt_dd;
