import * as React from 'react';
import { connect } from 'react-redux'
import system from '@rebass/components'
import { Box, Flex, Text } from 'rebass'
import List from '../components/list'

import { State as RootState } from '../reducers'
import { actions, State } from './redux'

const Input = system({
  is: 'input',
})

const BgImage = system(
  {
    is: 'div',
  },
  'backgroundImage',
  'backgroundRepeat',
  'backgroundPosition',
  'backgroundSize',
  'borderRadius',
  'height',
  'width',
)

type PassedProps = {
  createSong: (youtubeId: string) => void
}
type Props = PassedProps & State & typeof actions

class Room extends React.Component<Props, { createSong: () => void }> {
  changeQuery = (event: React.FormEvent<HTMLInputElement>) => {
    this.props.changeQuery(event.currentTarget.value)
  }

  render() {
    const {
      results,
    } = this.props
    const searchResults = results.map(result => {
      const onClick = () => this.props.createSong(result.id)
      console.log('result', result.image)

      return (
        <List.Item
          key={result.id}
          mb={4}
        >
          <Flex
            onClick={onClick}
            alignItems="center"
            display="flex"
          >
            <Box>
              <BgImage
                backgroundImage={`url(${result.image})`}
                backgroundSize="cover"
                borderRadius={4}
                height="80px"
                width="80px"
              />
            </Box>

            <Box>
              <Text
                color="offBlack"
                fontSize={3}
                fontWeight="bold"
              >
                {result.title}
              </Text>

              <Text
                color="grayDark"
                fontSize={3}
              >
                {result.description}
              </Text>
            </Box>
          </Flex>
        </List.Item>
      )
    })
    return(
      <>
        <Box my={3}>
          <Input type="search" value={this.props.query} onChange={this.changeQuery}/>
        </Box>

        <List is="ul">
          {searchResults}
        </List>
      </>
    )
  }
}

type MapStateToProps = (state: RootState) => State
const mapStateToProps: MapStateToProps = (state) => state.youtubeSearch

export default connect<State, typeof actions, PassedProps>(
  mapStateToProps,
  actions,
)(Room)
