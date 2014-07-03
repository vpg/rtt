/* dbdal to mongo
 * deps : mongoose
 * DRAFT
 */
var mongoose= require('mongoose');
var l=        require('winston');
var db_cnfx = require('../conf/db');
mongoose.connect( db_cnfx.url);

//var db = mongose.connection;
//module.exports= db;
