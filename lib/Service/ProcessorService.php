<?php

/*
 * @package    agitation/stats-bundle
 * @link       http://github.com/agitation/stats-bundle
 * @author     Alexander Günsche
 * @license    http://opensource.org/licenses/MIT
 */

namespace Agit\StatsBundle\Service;

use Agit\StatsBundle\Entity\StatData;
use Agit\StatsBundle\Event\StatsProcessEvent;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\HttpKernel\CacheWarmer\CacheWarmerInterface;

class ProcessorService implements CacheWarmerInterface
{
    private $entityManager;

    private $eventDispatcher;

    private $cacheService;

    private $dashboardData = [];

    public function __construct(EntityManagerInterface $entityManager, EventDispatcherInterface $eventDispatcher, CacheService $cacheService)
    {
        $this->entityManager = $entityManager;
        $this->eventDispatcher = $eventDispatcher;
        $this->cacheService = $cacheService;
    }

    public function warmUp($cacheDir)
    {
        $this->executeProcessors();
    }

    public function isOptional()
    {
        return true;
    }

    public function executeProcessors()
    {
        $this->dashboardData = [];

        $this->eventDispatcher->dispatch(
            "agit.stats.process",
            new StatsProcessEvent($this)
        );

        $this->cacheService->save($this->dashboardData);

        $this->cleanUp();
    }

    /**
     * Allows registered services to store their processed data.
     */
    public function storeDashboardData($key, $data)
    {
        return $this->dashboardData[$key] = $data;
    }

    /**
     * Provides previously collected raw data.
     */
    public function fetchRawData($module, $since, $until = null)
    {
        $set = $this->entityManager->createQuery("
            SELECT data.created, data.data
            FROM AgitStatsBundle:StatData data
            WHERE
                data.module = :module AND
                data.created BETWEEN :since AND :until
            ORDER BY data.created ASC
        ")
        ->setParameter("module", $module)
        ->setParameter("since", $since)
        ->setParameter("until", $until ?: time())
        ->execute();

        foreach ($set as &$row) {
            $row["data"] = json_decode($row["data"], true);
        }

        return $set;
    }

    private function cleanUp()
    {
        $this->entityManager->createQueryBuilder()
            ->delete("AgitStatsBundle:StatData", "data")
            ->where("data.expires <= :now")
            ->setParameter("now", time())
            ->getQuery()->execute();
    }
}
