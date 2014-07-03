/// Default logger
var winston=    require('winston');
var logger = require('winston');
logger.add(winston.transports.File, { filename: "logs/server.log" });
module.exports=logger;
