import * as React from 'react';
import { connect } from 'react-redux'
import system from '@rebass/components'
import { themeGet } from 'styled-system'
import { Box, Flex, Text } from 'rebass'
import List from '../components/list'
import BgImage from '../components/bg-image'

import { State as RootState } from '../reducers'
import { actions, State } from './redux'

const Input = system(
  {
    as: 'input',
    border: '1px solid',
    borderColor: 'offWhite',
    borderRadius: 4,
    boxShadow: 1,
    p: 2,
  },
  'border',
  'borderColor',
  'borderRadius',
  'boxShadow',
  'color',
  'maxWidth',
  'space',
  'width',
)

const SearchResult = system(
  {
    as: Flex,
    alignItems: 'center',
    borderRadius: 6,
    display: 'flex',
    p: 3,
  },
  props => ({
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: `${themeGet('colors.white')(props)}`,
      boxShadow: `${themeGet('shadows.1')(props)}`
    }
  }),
  'borderRadius'
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
      console.log(result)

      return (
        <List.Item key={result.id}>
          <SearchResult onClick={onClick}>
            <Box mr={3}>
              <BgImage
                backgroundImage={`url(${result.image})`}
                backgroundSize="cover"
                borderRadius={4}
                height="40px"
                width="40px"
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
            </Box>
          </SearchResult>
        </List.Item>
      )
    })
    return(
      <>
        <Box my={3}>
          <Input
            type="search"
            value={this.props.query}
            onChange={this.changeQuery}
            width="100%"
          />
        </Box>

        <List>
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
