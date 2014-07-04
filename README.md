#rtt
Off-site RaealTimeTracker project

### How to USE (client side)
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
		rtt.monitor_view( rtt.build_page_code(), function (event_x){
			var view_count = parseInt($('#view_count').html(),10)+event_x.value;
			$('#view_count').html(view_count);
		});
	</script>
        
            
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

###Archi Technique
 * NodeJS
 * MongoDB
 * Symfony 2
 * BootstrapCSS http://getbootstrap.com/
