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

    public function topAction() {
        return $this->render('DashboardBundle:Metrics:metrics.html.twig');
    }

    public function flopAction() {
        return $this->render('DashboardBundle:Metrics:metrics.html.twig');
    }

    public function searchAction() {
        return $this->render('DashboardBundle:Metrics:metrics.html.twig');
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
