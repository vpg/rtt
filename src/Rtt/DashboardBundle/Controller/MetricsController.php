<?php

namespace Rtt\DashboardBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Rtt\DashboardBundle\Document\Event;
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
        //$event->setOccuredOn(new \DateTime());

        $dm = $this->get('doctrine_mongodb')->getManager();
        $dm->persist($event);
        $dm->flush();

        return new Response('Created product id '.$event->getId());
    }

}
