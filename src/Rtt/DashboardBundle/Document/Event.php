<?php

namespace Rtt\DashboardBundle\Document;



/**
 * Rtt\DashboardBundle\Document\Event
 */
class Event
{
    const TYPE_VISIT    = 'visit';
    const TYPE_CLICK    = 'click';
    const TYPE_SCROLL   = 'scroll';

    /**
     * @var MongoId $id
     */
    protected $id;

    /**
     * @var string $type
     */
    protected $type;

    /**
     * @var string $value
     */
    protected $value;

    /**
     * @var datetime $occured_on
     */
    protected $occured_on;


    /**
     * Get id
     *
     * @return id $id
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set type
     *
     * @param string $type
     * @return self
     */
    public function setType($type)
    {
        $this->type = $type;
        return $this;
    }

    /**
     * Get type
     *
     * @return string $type
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Set value
     *
     * @param string $value
     * @return self
     */
    public function setValue($value)
    {
        $this->value = $value;
        return $this;
    }

    /**
     * Get value
     *
     * @return string $value
     */
    public function getValue()
    {
        return $this->value;
    }

    /**
     * Set occuredOn
     *
     * @param datetime $occuredOn
     * @return self
     */
    public function setOccuredOn(\datetime $occuredOn)
    {
        $this->occured_on = $occuredOn;
        return $this;
    }

    /**
     * Get occuredOn
     *
     * @return datetime $occuredOn
     */
    public function getOccuredOn()
    {
        return $this->occured_on;
    }
}
