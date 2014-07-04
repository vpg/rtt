<?php

namespace Rtt\EventBundle\Document;



/**
 * Rtt\EventBundle\Document\Client
 */
class Client
{
    /**
     * @var int $id
     */
    protected $id;

    /**
     * @var string $ip
     */
    protected $ip;

    /**
     * @var string $user_agent
     */
    protected $user_agent;


    /**
     * Set id
     *
     * @param int $id
     * @return self
     */
    public function setId($id)
    {
        $this->id = $id;
        return $this;
    }

    /**
     * Get id
     *
     * @return int $id
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set ip
     *
     * @param string $ip
     * @return self
     */
    public function setIp($ip)
    {
        $this->ip = $ip;
        return $this;
    }

    /**
     * Get ip
     *
     * @return string $ip
     */
    public function getIp()
    {
        return $this->ip;
    }

    /**
     * Set userAgent
     *
     * @param string $userAgent
     * @return self
     */
    public function setUserAgent($userAgent)
    {
        $this->user_agent = $userAgent;
        return $this;
    }

    /**
     * Get userAgent
     *
     * @return string $userAgent
     */
    public function getUserAgent()
    {
        return $this->user_agent;
    }
}
