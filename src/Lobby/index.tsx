import * as React from 'react';
import { connect } from 'react-redux'
import { push as reduxPush } from 'connected-react-router'
import { Radio, Star } from 'react-feather'
import system from '@rebass/components'
import { themeGet } from 'styled-system'
import { Button, Box, Card, Flex, Text } from 'rebass'

import { actions as roomActions } from '../models/room'

import { State as RootState } from '../reducers'
import { State, types } from './redux'

const RoomList = system(
  {
    is: 'ul',
    display: 'flex',
    m: 0,
    p: 0,
  },
  {
    listStyleType: 'none'
  },
  'display',
  'flex',
  'space',
)

const RoomItem = system(
  {
    is: 'li',
    bg: 'white',
    borderRadius: 4,
    border: '1px solid',
    borderColor: 'grayLight',
    flex: '0 0 33%',
    p: 3,
  },
  props => ({
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'white',
      boxShadow: `${themeGet('shadows.1')(props)}`,
    }
  }),
  'border',
  'borderColor',
  'borderRadius',
  'color',
  'flex',
  'space',
  'boxShadow',
)

const UserIconMini = system(
  {
    is: Card,
    alignItems: 'center',
    bg: 'purpleLight',
    borderRadius: '100%',
    color: 'white',
    display: 'flex',
    height: '24px',
    justifyContent: 'center',
    p: 1,
    textAlign: 'center',
    width: '24px',
  },
  'alignItems',
  'border',
  'borderColor',
  'color',
  'display',
  'height',
  'justifyContent',
  'textAlign',
)

type Actions = typeof roomActions & { push: typeof reduxPush }
type Props = State & Actions

class Lobby extends React.Component<Props, {}> {
  componentDidMount() {
    this.props.getRooms(types.GET_ROOMS_OK, types.GET_ROOMS_ERR)
  }

  render() {
    const rooms = this.props.rooms.map(r => {
      const onClick = () => this.props.push(`/room/${r.id}`)
      // TODO make this less terrible
      const renderAdditionalActiveUsers = () => {
        if (r.users && r.users.length > 3) {
          return (
            <UserIconMini
              bg="white"
              color="purpleLight"
              border="1px solid"
              borderColor="purpleLight"
              mr={1}
            >
              <Text fontSize={0}>+{r.users.length - 3}</Text>
            </UserIconMini>
          )
        } else {
          return
        }
      }
      const renderActiveUsers = r.users.map((user, i) => {
        const matches = user.name.match(/\b(\w)/g)
        const userInitials = matches ? matches.join('') : 'NA'
        return (
          <UserIconMini key={`user-${i}`} mr={1}>
            <Text fontSize={0}>{userInitials}</Text>
          </UserIconMini>
        )
      })

      return (
        <RoomItem
          key={r.id}
          onClick={onClick}
        >
          <Flex
            alignItems="center"
            justifyContent="space-between"
            mb={3}
          >
            <Text
              display="flex"
              color="offBlack"
              fontSize={4}
              fontWeight="bold"
            >
              {r.name}{' '}
            </Text>

            <Box color="yellow">
              <Star size={14} />
            </Box>
          </Flex>

          <Text
            color="grayDark"
            fontSize={3}
            mb={3}
          >
            Maybe a room description or list of allowed genres can go here. I don't know.
          </Text>

          <Box mb={3}>
            <Text
              color="offBlack"
              fontSize={3}
              fontWeight="bold"
              mb={1}
            >
              Now Playing
            </Text>

            <Flex alignItems="center">
              <Radio size={14} />

              <Text
                color="grayDark"
                ml={2}
              >
                {!r.currentSong ? 'Room currently Empty' : r.currentSong && r.currentSong.name}
              </Text>
            </Flex>
          </Box>

          <Box mb={3}>
            <Text
              color="offBlack"
              fontSize={3}
              fontWeight="bold"
              mb={1}
            >
              Active Users
            </Text>

            <Flex alignItems="center">
              {renderActiveUsers}
              {renderAdditionalActiveUsers()}
            </Flex>
          </Box>

          <Button
            variant="primary"
            fontSize={2}
          >
            Join Room
          </Button>
        </RoomItem>
      )
    })
    return (
      <RoomList>
        {rooms}
      </RoomList>
    )
  }
}

type MapStateToProps = (state: RootState) => State
const mapStateToProps: MapStateToProps = (state) => state.lobby

export default connect<State, Actions, {}>(
  mapStateToProps,
  { ...roomActions, push: reduxPush }
)(Lobby)
