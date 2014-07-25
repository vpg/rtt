/// Models
var winston=    require( 'winston');
require( '../dbals/mongoose');
var event_domain= require( '../domains/event');

module.exports= function( app){
    var event_d= new event_domain();
    
    /// Routes
    app.get( '/events/type/:type_code/element/:element_id', get_events_by_type_n_element);
    app.get( '/events/type/:type_code/element/:element_id/from/:from', get_events_by_type_n_element_from);
    app.get( '/events/type/:type_code/element/:element_id/from/:from/to/:to', get_events_by_type_n_element_n_period);

    app.get( '/events/type/salesroom/number/:number', get_sales_click_by_number);
    app.get( '/heatmap/:x/:y', get_heatmap_by_position);
    app.get( '*', home);

    /// Render callbaks
    function handle_err( err, res){
        if( err){
            winston.error('todo/routes/err : %s ' + err);
            res.send(500, err);
        }
    }
    function render( res, err, x){
        // xxx list all allowed doms
        res.setHeader('Access-Control-Allow-Origin',  "*");
        res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
        if(err) handle_err(err, res);
        if((! x.event_xs) || ( ! x.event_xs.length)) res.send(404);
        else res.json(x);
    }

    /// Routes callbacks
    function home(req, res){
        res.setHeader('Content-Type', 'text/plain');
        res.end("RTT - RealTimeTracker\nv0.1");
    }
    function get_heatmap_by_position(req, res){
      res.setHeader('Access-Control-Allow-Origin',  "*");
      event_d.get_heatmap_by_position( req.params.x, req.params.y, render.bind(this, res));
    }
    function get_events_by_type_n_element( req, res){
      res.setHeader('Access-Control-Allow-Origin',  "*");
      res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");


        /// deal w/ group by
        if( typeof req.query.g != 'undefined'){
            event_d.group_by_type_n_element( req.params.type_code, req.params.element_id, req.query.g,  render.bind(this, res));
        }
        else{
            event_d.get_by_type_n_element( req.params.type_code, req.params.element_id, render.bind(this, res));
        }
    }
    function get_events_by_type_n_element_from( req, res){
        /// deal w/ group by
        if( typeof req.query.g != 'undefined'){
            event_d.group_by_type_n_element_from( req.params.type_code, req.params.element_id, req.params.from, req.query.g, render.bind(this, res));
        }
        else{
            event_d.get_by_type_n_element_from( req.params.type_code, req.params.element_id, req.params.from, render.bind(this, res));
        }
    }
    function get_events_by_type_n_element_n_period( req, res){
        /// deal w/ group by
        if( typeof req.query.g != 'undefined'){
            event_d.group_by_type_n_element_n_period( req.params.type_code, req.params.element_id, req.params.from, req.params.to, req.query.g, render.bind(this, res));
        }
        else{
            event_d.get_by_type_n_element_n_period( req.params.type_code, req.params.element_id, req.params.from, req.params.to, render.bind(this, res));
        }
    }
    function get_sales_click_by_number( req, res){
      event_d.get_sales_click_by_number( req.params.number, render.bind(this, res));
    }
}
