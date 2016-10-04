<?php

/*
 * @package    agitation/stats-bundle
 * @link       http://github.com/agitation/stats-bundle
 * @author     Alexander Günsche
 * @license    http://opensource.org/licenses/MIT
 */

namespace Agit\StatsBundle\Controller;

use Agit\ApiBundle\Exception\UnauthorizedException;
use Agit\IntlBundle\Tool\Translate;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

class DashboardController extends Controller
{
    public function loadAction()
    {
        if (! $this->container->get("agit.user")->currentUserCan("agit.stats")) {
            throw new UnauthorizedException(Translate::t("You are currently not allowed to access this page. Please log in to view the dashboard."));
        }

        $data = $this->container->get("agit.stats.cache")->loadJson();
        $response = new Response($data, 200);
        $response->headers->set("Content-Type", "application/json; charset=UTF-8");
        $response->headers->set("Expires", "Mon, 7 Apr 1980 05:00:00 GMT");
        $response->headers->set("Cache-Control", "no-cache, must-revalidate, max-age=0", true);
        $response->headers->set("Pragma", "no-store", true);

        return $response;
    }
}
