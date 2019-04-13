import * as React from 'react'
import { Headphones, LogOut } from 'react-feather'
import system from '@rebass/components'
import { Box, Button, Flex } from 'rebass'

const Header = system(
  {
    as: 'header',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    py: 3,
    px: [4, 5],
  },
  'alignItems',
  'color',
  'display',
  'flex',
  'justifyContent',
  'space'
)

Header.Logo = system(
  {
    as: 'a',
    alignItems: 'center',
    color: 'offBlack',
    display: 'flex',
    fontSize: 1,
    fontWeight: 'bold',
    textStyle: 'uppercase',
  },
  {
    textDecoration: 'none',
  },
  'alignItems',
  'color',
  'display',
  'fontSize',
  'fontWeight',
  'textStyle',
  'space',
)

Header.LogoIcon = system(
  {
    as: Flex,
    alignItems: 'center',
    borderRadius: '100%',
    boxShadow: 1,
    bg: 'purple',
    color: 'white',
    justifyContent: 'center',
    p: 2,
  },
  'borderRadius',
  'boxShadow',
)

interface IProps {
  title: string
}

const TopNavHeader: React.SFC<IProps> = ({
  title,
}) => {
  return (
    <Header>
      <Header.Logo href="/">
        <Header.LogoIcon>
          <Headphones size={20} />
        </Header.LogoIcon>
        <Box mx={2}>{title}</Box>
      </Header.Logo>

      <Button
        bg="white"
        color="purple"
        fontSize={2}
        fontWeight="bold"
      >
        <Flex alignItems="center">
          Logout
          <Box mx={1} />
          <LogOut size={14}/>
        </Flex>
      </Button>
    </Header>
  )
}

export default TopNavHeader
