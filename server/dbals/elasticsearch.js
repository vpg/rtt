/* dbdal to mongo
 * deps : mongoose
 * DRAFT
 */
var elasticsearch = require('elasticsearch'),
    l =             require('winston'),
    es_cnfx =       require('../conf/elasticsearch');

var esClient = new elasticsearch.Client({
    host: es_cnfx.host + ':' + es_cnfx.port,
    log:  'trace'
});

module.exports = esClient;
