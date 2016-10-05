<?php

/*
 * @package    agitation/stats-bundle
 * @link       http://github.com/agitation/stats-bundle
 * @author     Alexander Günsche
 * @license    http://opensource.org/licenses/MIT
 */

namespace Agit\StatsBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class GenerateStatsCommand extends ContainerAwareCommand
{
    protected function configure()
    {
        $this
            ->setName("agit:stats:generate")
            ->setDescription("generate dashboard statistics.");
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        return $this->getContainer()->get("agit.stats.processor")->executeProcessors();
    }
}
