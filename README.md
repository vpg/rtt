#rtt
Off-site RaealTimeTracker project

###USE
	git clone git@github.com:vpg/rtt.git
	cd rtt
	vagrant up
	vagrant ssh
		sudo ln -s /opt/VBoxGuestAdditions-4.3.10/lib/VBoxGuestAdditions /usr/lib/VBoxGuestAdditions
	vagrant reload
	
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

###DB
Structure d’un doc “event”
 * type [ visit, click, scroll, …]
 * element_x :
  * code
  * application
  * country
  * protocole  [http, https]
  * domain
  * path
  * params
  * target
 * value
 * occured_on
 * client_x:
 * id
 * ip 
 * user_agent

###Nice to have

 * Gestion des différentes entités (VP/TH/ODV)
 * GeoIP sur l’IP du client

###Installing Symfony 2
```composer create-project symfony/framework-standard-edition path/ "2.5.*"```
