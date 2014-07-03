<?php

namespace Rtt\DashboardBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

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
}
