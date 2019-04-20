import * as React from 'react'
import system from '@rebass/components'
import { Box, Flex, Text } from 'rebass'
import { ThumbsUp, ThumbsDown } from 'react-feather'

import BgImage from '../components/bg-image'

const Footer = system(
  {
    is: 'footer',
    borderTop: '2px solid',
    borderColor: 'grayLight',
    maxWidth: '100%',
    py: 3,
    px: [4, 5],
  },
  'borderTop',
  'borderColor',
  'color',
  'display',
  'maxWidth',
  'space',
)

const Slider = system(
  {
    is: 'input',
    maxWidth: '100%',
  },
  'maxWidth',
)

const placeholderImage = `
https://images.unsplash.com/photo-1535992165812-68d1861aa71e?
ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&
auto=format&
fit=crop&
w=2474&q=80
`

interface IProps {
  title?: string
}

const MainFooter: React.SFC<IProps> = ({
  title,
}) => {
  return (
    <Footer>
      <Flex alignItems="center" justifyContent="space-between">
        <Box>
          <Flex alignItems="center">
            <BgImage
              backgroundImage={`url(${placeholderImage})`}
              backgroundSize="cover"
              borderRadius={4}
              height="50px"
              width="50px"
            />

            <Box mx={2}>
              <Text fontSize={3} fontWeight="bold" color="offBlack">Bon Iver - Skinny Love</Text>
              <Text fontSize={3} color="grayDark">For Emma, Forever Ago</Text>
            </Box>
          </Flex>
        </Box>

        <Box>
          <Slider type="range" />
        </Box>

        <Box>
          <Flex>
            <ThumbsUp />
            <ThumbsDown />
          </Flex>
        </Box>
      </Flex>
    </Footer>
  )
}

export default MainFooter
