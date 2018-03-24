<?php
declare(strict_types=1);

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

    public function put($module, $data, $ttl = 33)
    {
        $created = time();
        $statData = new StatData();
        $statData->setCreated($created);
        $statData->setExpires($created + ($ttl * 24 * 3600));
        $statData->setModule($module);
        $statData->setData($data);

        $this->entityManager->persist($statData);
        $this->entityManager->flush();
    }

    public function get($module, $since, $until = null)
    {
        $set = $this->entityManager->createQuery('
            SELECT data.created, data.data
            FROM AgitStatsBundle:StatData data
            WHERE
                data.module = :module AND
                data.created BETWEEN :since AND :until
            ORDER BY data.created ASC
        ')
        ->setParameter('module', $module)
        ->setParameter('since', $since)
        ->setParameter('until', $until ?: time())
        ->execute();

        foreach ($set as &$row)
        {
            $row['data'] = json_decode((string)$row['data'], true);
        }

        return $set;
    }

    public function cleanUp()
    {
        $this->entityManager->createQueryBuilder()
            ->delete('AgitStatsBundle:StatData', 'data')
            ->where('data.expires <= :now')
            ->setParameter('now', time())
            ->getQuery()->execute();
    }
}
