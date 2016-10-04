<?php

/*
 * @package    agitation/stats-bundle
 * @link       http://github.com/agitation/stats-bundle
 * @author     Alexander Günsche
 * @license    http://opensource.org/licenses/MIT
 */

namespace Agit\StatsBundle\Entity;

use Agit\BaseBundle\Entity\GeneratedIdentityAwareTrait;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(indexes={
 *      @ORM\Index(columns={"module", "created"})
 * })
 */
class StatData
{
    use GeneratedIdentityAwareTrait;

    /**
     * @ORM\Column(type="string",length=60)
     */
    protected $module;

    /**
     * @ORM\Column(type="integer")
     */
    protected $created;

    /**
     * @ORM\Column(type="integer")
     */
    protected $expires;

    /**
     * @ORM\Column(type="text")
     */
    protected $data;

    /**
     * Set module.
     *
     * @param string $module
     *
     * @return StatData
     */
    public function setModule($module)
    {
        $this->module = $module;

        return $this;
    }

    /**
     * Get module.
     *
     * @return string
     */
    public function getModule()
    {
        return $this->module;
    }

    /**
     * Set created.
     *
     * @param int $created
     *
     * @return StatData
     */
    public function setCreated($created)
    {
        $this->created = $created;

        return $this;
    }

    /**
     * Get created.
     *
     * @return int
     */
    public function getCreated()
    {
        return $this->created;
    }

    /**
     * Set data.
     *
     * @param string $data
     *
     * @return StatData
     */
    public function setData($data)
    {
        $this->data = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

        return $this;
    }

    /**
     * Get data.
     *
     * @return string
     */
    public function getData()
    {
        return json_decode($this->data, true);
    }

    /**
     * Get expires.
     *
     * @return int
     */
    public function getExpires()
    {
        return $this->expires;
    }

    /**
     * Set expires.
     *
     * @param int expires
     *
     * @return StatData
     */
    public function setExpires($expires)
    {
        $this->expires = $expires;

        return $this;
    }
}
