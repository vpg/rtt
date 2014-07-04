/* mongo.rtt.event model
 * strong dependency w/ symfony.mongo.odm.event
 */

var mongoose=   require('mongoose');
var name= 'event';
var schema_x= new mongoose.Schema(
    { //_id:  { type:  mongoose.Schema.ObjectId},
      type:       { type: String,  required: true},
      element_x:  { 
                     code:          String,
                     application:   String,
                     country:       String,
                     protocol:      String,
                     domain:        String,
                     path:          String,
                     params:        String,
                     target:        String,
                  },
      occured_on: { type: Date, default: Date.now },
      client_x:   {
                    id:             String,
                    ip:             String,
                    user_agent_x:   {
                      raw:    String,
                      client: String,
                      name:   String,
                      os:     String,
                      device: String
                     },
      },
      value:    String
    },
    { collection: name }
);

module.exports = mongoose.model( name, schema_x);

/*

var e = { 
      type: 'visit',
      element_x:  { 
                     application:   'front',
                     country:       'fr_FR',
                     protocol:      'http',
                     domain:        'www.voyage-prive.com',
                     path:          '/fiche-produit/details/33394',
                     params:        null
                     target:        null,
                  },
      occured_on: '',
      client_x:   {
                    id:             'JB',
                    user_agent:     'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1500.71 Safari/537.36',
                    ip:             '1.1.1.1',
                  },
      value:    1
    };
*/
