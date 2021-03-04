import {
  BiGridAlt,
  BiRepost,
  BiLink,
  BiHorizontalCenter,
  BiWater,
  BiCoinStack,
  BiShuffle,
  BiCoin,
  BiTimer,
  BiRocket,
  BiMeteor,
  BiHeading,
  BiLayerPlus,
  BiDice5,
  BiCheckCircle,
  BiAbacus,
  BiLineChart
} from 'react-icons/bi'

const sideMenu = [
  {
    type: 'single',
    menu: {
      name: 'Dashboard',
      icon: <BiGridAlt />,
      link: '/'
    }
  },
  {
    type: 'collapse',
    menu: {
      name: 'Exchange HUB',
      icon: <BiRepost />,
      sub: [
        {
          name: 'Bridge',
          icon: <BiLink />,
          link: '/bridge'
        },
        {
          name: 'Swap',
          icon: <BiHorizontalCenter />,
          link: '/swap'
        },
        {
          name: 'Liquidity',
          icon: <BiWater />,
          link: '/liquidity'
        }
      ]
    }
  },
  {
    type: 'collapse',
    menu: {
      name: 'Stake HUB',
      icon: <BiCoinStack />,
      sub: [
        {
          name: 'LP Staking',
          icon: <BiShuffle />,
          link: '/lp-staking'
        },
        {
          name: 'Single Staking',
          icon: <BiCoin />,
          link: '/single-staking'
        },
        {
          name: 'Fixed Staking',
          icon: <BiTimer />,
          link: '/fixed-staking'
        }
      ]
    }
  },
  {
    type: 'collapse',
    menu: {
      name: 'Startup HUB',
      icon: <BiRocket />,
      sub: [
        {
          name: 'Startup Pool',
          icon: <BiMeteor />,
          link: '/startup-pool'
        },
        {
          name: 'IHO',
          icon: <BiHeading />,
          link: '/iho'
        }
      ]
    }
  },
  {
    type: 'collapse',
    menu: {
      name: 'Additional HUB',
      icon: <BiLayerPlus />,
      sub: [
        {
          name: 'Lottery',
          icon: <BiDice5 />,
          link: '/lottery'
        },
        {
          name: 'Voting',
          icon: <BiCheckCircle />,
          link: '/voting'
        }
      ]
    }
  },
  {
    type: 'single',
    menu: {
      name: 'Lending HUB',
      icon: <BiAbacus />,
      link: '/lending'
    }
  },
  {
    type: 'single',
    menu: {
      name: 'Analytics',
      icon: <BiLineChart />,
      link: '/analytics'
    }
  }
]

export default sideMenu