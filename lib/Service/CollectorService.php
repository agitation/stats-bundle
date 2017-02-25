<?php

/*
 * @package    agitation/stats-bundle
 * @link       http://github.com/agitation/stats-bundle
 * @author     Alexander Günsche
 * @license    http://opensource.org/licenses/MIT
 */

namespace Agit\StatsBundle\Service;

use Agit\StatsBundle\Entity\StatData;
use Doctrine\ORM\EntityManagerInterface;

class CollectorService
{
    private $entityManager;

    private $eventDispatcher;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function add($module, $data, $ttl = 33)
    {
        $created = time();
        $statData = new StatData();
        $statData->setCreated($created);
        $statData->setExpires($created + ($ttl * 24 * 3600));
        $statData->setModule($module);
        $statData->setData($data);

        $this->entityManager->persist($statData);

        return $this;
    }

    public function save()
    {
        $this->entityManager->flush();
    }
}
