#rtt
Off-site RaealTimeTracker project

### How to USE


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
