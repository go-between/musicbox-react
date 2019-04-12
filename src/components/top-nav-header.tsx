import * as React from 'react'
import { Headphones } from 'react-feather'
import system from '@rebass/components'
import { Box } from 'rebass'

const Header = system(
  {
    is: 'header',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    p: [4, 5],
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
    is: 'a',
    alignItems: 'center',
    color: 'offBlack',
    display: 'flex'
  },
  {
    textDecoration: 'none',
  },
  'alignItems',
  'color',
  'display',
  'space',
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
        <Headphones/>
        <Box mx={2}>{title}</Box>
      </Header.Logo>

      <Box>
        <button>Logout</button>
      </Box>
    </Header>
  )
}

export default TopNavHeader
