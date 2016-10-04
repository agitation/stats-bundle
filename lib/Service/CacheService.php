<?php

/*
 * @package    agitation/stats-bundle
 * @link       http://github.com/agitation/stats-bundle
 * @author     Alexander Günsche
 * @license    http://opensource.org/licenses/MIT
 */

namespace Agit\StatsBundle\Service;

use Doctrine\Common\Cache\FilesystemCache;

class CacheService
{
    const CACHE_KEY = "agit.stats.dashboard";

    private $cache;

    public function __construct($cacheDir)
    {
        $this->cache = new FilesystemCache($cacheDir);
    }

    public function save($data)
    {
        $this->cache->save(self::CACHE_KEY, $data);
    }

    public function load()
    {
        return $this->cache->fetch(self::CACHE_KEY) ?: [];
    }

    public function loadJson()
    {
        return json_encode($this->load(), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_OBJECT_AS_ARRAY);
    }
}
