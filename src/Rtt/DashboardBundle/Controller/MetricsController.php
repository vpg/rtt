<?php

namespace Rtt\DashboardBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Rtt\EventBundle\Document\Event;
use Rtt\EventBundle\Document\Element;
use Rtt\EventBundle\Document\Client;
use Symfony\Component\HttpFoundation\Response;

class MetricsController extends Controller
{
    public function overviewAction() {
        return $this->render('DashboardBundle:Metrics:metrics.html.twig');
    }

    public function topVisitsAction() {
        $events = $this->get('doctrine_mongodb')
          ->getManager()
          ->getRepository('EventBundle:Event')
          ->findByType('visit:in');

        // Getting events of the day
        $visitsOfDay = [];
        $now = new \DateTime();
        foreach($events as $event) {
            $diff = $now->diff($event->getOccuredOn());
            if (
                $diff->y == 0 &&
                $diff->m == 0 &&
                $diff->d == 0
            ) {
                $visitsOfDay[] = $event;
            }
        }

        $offers = [];
        $nbTotalVisits = 0;
        foreach($visitsOfDay as $event) {
            $path = $event->getElementX()->getPath();
            if (strpos($path, 'fiche-produit/details') !== false) {
                $pathX = explode('/', $path);
                $offerCode = $pathX[3];
                if (isset($offers[$offerCode])) {
                    $offers[$offerCode]["code"] = $offerCode;
                    $offers[$offerCode]["value"]++;
                } else {
                    $offers[$offerCode] = [];
                    $offers[$offerCode]["code"] = $offerCode;
                    $offers[$offerCode]["value"] = 1;
                }
            }
        }
        usort($offers, function($a, $b)
        {
          return $b['value'] - $a['value'];
        });



        return $this->render('DashboardBundle:Metrics:topVisits.html.twig',
          array('offers'  => $offers)
        );
    }



    public function flopAction() {
        return $this->render('DashboardBundle:Metrics:metrics.html.twig');
    }

    public function searchAction() {
        return $this->render('DashboardBundle:Metrics:metrics.html.twig');
    }

    public function listByTypeAction($type=null) {
        $events = $this->get('doctrine_mongodb')
            ->getManager()
            ->getRepository('EventBundle:Event')
            ->findAll();

        return $this->render('DashboardBundle:Metrics:list.html.twig', array('events' => $events));
    }

    public function insertRecordAction() {
        $event = new Event();
        $event->setType(Event::TYPE_CLICK);
        $event->setOccuredOn(time());
        $event->setValue('val');

        $client = new Client();
        $client->setId(123);
        $client->setIp("192.111.111.111");
        $client->setUserAgent("user agent");
        $event->setClientX($client);

        $element = new Element();
        $element->setApplication('front');
        $element->setCode('code');
        $element->setCountry('fr');
        $element->setDomain('http://google.fr');
        $element->setParams('?foo=bar');
        $element->setPath('/oooo');
        $element->setProtocole('http');
        $element->setTarget('#div');
        $event->setElementX($element);

        $dm = $this->get('doctrine_mongodb')->getManager();
        $dm->persist($event);
        $dm->flush();

        return new Response('Created event id '.$event->getId());
    }

}
