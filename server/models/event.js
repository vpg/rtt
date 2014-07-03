var mongoose=   require('mongoose');
var name= 'event';
var schema= new mongoose.Schema(
    { //_id:  { type:  mongoose.Schema.ObjectId},
      type:       { type: String,  required: true}, // "visit", "click"
      code:       { type: String,  required: true}, // "page:in", "page:out", "click"
      element_x:  { 
                     code:          String, // <product_id>, <cart_id>, <product_id>:<variation>
                     application:   String, // a human readable label
                     country:       String,
                     protocol:      String,
                     domain:        String,
                     path:          String,
                     params:        String,
                     target:        String, // 'http://back.jb.o.cc/basecat/eos/?s=&l=fr_FR&q=sophie'
                  },
      occured_on: { type: Date, default: Date.now },
      client_x:   {
                    id:             String,
                    user_agent:     String,
                    ip:             String,
                  }
      value:    String
    },
    { collection: name }
);
module.exports = mongoose.model( name, schema);
