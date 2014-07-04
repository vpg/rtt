<?php

namespace Rtt\EventBundle\Document;



/**
 * Rtt\EventBundle\Document\Event
 */
class Event
{
    const TYPE_CLICK    = 'click';
    const TYPE_VISIT    = 'visite';
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
     * @var timestamp $occured_on
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
     * @param timestamp $occuredOn
     * @return self
     */
    public function setOccuredOn($occuredOn)
    {
        $this->occured_on = $occuredOn;
        return $this;
    }

    /**
     * Get occuredOn
     *
     * @return timestamp $occuredOn
     */
    public function getOccuredOn()
    {
        return $this->occured_on;
    }
    /**
     * @var Rtt\EventBundle\Document\Element
     */
    protected $element_x;


    /**
     * Set elementX
     *
     * @param Rtt\EventBundle\Document\Element $elementX
     * @return self
     */
    public function setElementX(\Rtt\EventBundle\Document\Element $elementX)
    {
        $this->element_x = $elementX;
        return $this;
    }

    /**
     * Get elementX
     *
     * @return Rtt\EventBundle\Document\Element $elementX
     */
    public function getElementX()
    {
        return $this->element_x;
    }
    /**
     * @var Rtt\EventBundle\Document\Client
     */
    protected $client_x;


    /**
     * Set clientX
     *
     * @param Rtt\EventBundle\Document\Client $clientX
     * @return self
     */
    public function setClientX(\Rtt\EventBundle\Document\Client $clientX)
    {
        $this->client_x = $clientX;
        return $this;
    }

    /**
     * Get clientX
     *
     * @return Rtt\EventBundle\Document\Client $clientX
     */
    public function getClientX()
    {
        return $this->client_x;
    }
}
