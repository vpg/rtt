// Elasticsearch conf file (beta)
var env = process.env.VP_ENV || 'dev'

var confx = {
    dev: {
		host: '192.168.20.21',
		port: 9200
    },
    recette: {
		host: 'rtt.recette.vpg.lan',
		port: 9200
    }
};


module.exports = confx[env];
