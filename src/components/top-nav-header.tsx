import * as React from 'react'
import { Headphones, User } from 'react-feather'
import system from '@rebass/components'
import { Box, Flex } from 'rebass'
import Container from './container'
import Icon from './icon'

const Header = system(
  {
    as: 'header',
    bg: 'white',
    boxShadow: 1,
    py: 3,
  },
  'boxShadow',
  'color',
  'display',
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
      <Container
        alignItems="center"
        display="flex"
        justifyContent="space-between"
      >
        <Header.Logo href="/">
          <Header.LogoIcon>
            <Headphones size={20} />
          </Header.LogoIcon>
          <Box mx={2}>{title}</Box>
        </Header.Logo>

        <Box>
          <Icon
            bg="white"
            border="2px solid"
            borderColor="purple"
            borderRadius="100%"
            color="purple"
          >
            <User size={20} />
          </Icon>
        </Box>
      </Container>
    </Header>
  )
}

export default TopNavHeader
