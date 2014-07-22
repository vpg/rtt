#rtt
Off-site RealTimeTracker project
Based on NodeJS (+SOcket.io) and MongoDB

### How to USE (client side)
#### Fetching events w/ RTT REST API
##### Routes
	/events/type/:type_code/element/:element_id 
	/events/type/:type_code/element/:element_id/from/:from
	/events/type/:type_code/element/:element_id/from/:from/to/:to
##### Ex.
Fetching events type ```visit:in``` for the element ```a823e22266698c2ed2a52ed4039ed361```
	http://127.0.0.1:8086/events/type/visit:in/element/a823e22266698c2ed2a52ed4039ed361
Fetching events type ```click``` for the element ```f124e12356798c2ed2a52ed4039DA987``` since the ```2014-07-21 12:00:00```
	http://127.0.0.1:8086/events/type/click/element/f124e12356798c2ed2a52ed4039DA987/from/2014-07-21%2012:00:00
 
#### Send events
Get socket.io from rtt server

	<script src="http://192.168.20.20:8086/socket.io/socket.io.js"></script>        

Include RTT client class
	
	<script src="rtt.js"></script>        

track page view
	
	<script type="text/javascript">
		rtt.view();
		window.onbeforeunload = function () {
			rtt.leave();
		}
	</script>
    
track click
	
	<script type="text/javascript">
		$('#get_rtt_btn').bind('click', function () {
			rtt.click( $(this).attr('id'));
		});
	</script>
    
Monitoring tracking
	
	<script type="text/javascript">
		/* Subcribe to an event
		 * rtt.monitor_view( _event_code, _callback( _event_x))
		 * on each new event relative to the _event_code, call a callback function _callback w/ the given event hashmap _event_x
		*/
		rtt.monitor_view( rtt.build_view_code(), function (event_x){
			// Increment a counter
			var view_count = parseInt($('#view_count').html(),10)+event_x.value;
			$('#view_count').html(view_count);
		});
	</script>


### How to Maintain
Install rtt server

	git clone git@github.com:vpg/rtt.git
	cd rtt
	vagrant up
	vagrant ssh
		sudo ln -s /opt/VBoxGuestAdditions-4.3.10/lib/VBoxGuestAdditions /usr/lib/VBoxGuestAdditions
	vagrant reload
Run server

	vagrant ssh
	cd /rtt/server
	node server.js
	
	
###Objectifs Fonctionnel
 * Mettre en place des indicateurs de divers natures, relatif à l’utilisation des UIs (sites et back office) et à l'exécution des batchs
 * Créer une interface de restitution de ces indicateurs (avec filtres)
	
###Objectif techniques
 * Ne pas impacter le chargement des pages
 * Temps Réel
 * Fournir une API de tracking 
 * Mise en place de métriques sans effort
 * Récupération de métriques
