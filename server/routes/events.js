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
    app.get('*', home);

    /// Render callbaks
    function handle_err( err, res){
        if( err){
            winston.error('todo/routes/err : %s ' + err);
            res.send(500, err);
        }
    }
    function render( res, err, todo_xs){
        if(err) handle_err(err, res);
        if( ! todo_xs.length) res.send(404);
        else res.json(todo_xs);
    }

    /// Routes callbacks
    function home(req, res){
        res.setHeader('Content-Type', 'text/plain');
        res.end("RTT - RealTimeTracker\nv0.1");
    }
    function get_events_by_type_n_element( req, res){
        event_d.get_by_type_n_element( req.params.type_code, req.params.element_id, render.bind(this, res));
    }
    function get_events_by_type_n_element_from( req, res){
        event_d.get_by_type_n_element_from( req.params.type_code, req.params.element_id, req.params.from, render.bind(this, res));
    }
    function get_events_by_type_n_element_n_period( req, res){
        event_d.get_by_type_n_element_n_period( req.params.type_code, req.params.element_id, req.params.from, req.params.to, render.bind(this, res));
    }
}
