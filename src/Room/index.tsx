import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { Box, Card, Flex, Text } from 'rebass'
import { MessageCircle, Radio, RotateCw, User } from 'react-feather'

import { State as RootState } from 'reducers'
import { actions as roomActions } from 'models/room'

import Player from './components/Player'
import RoomSong from './components/RoomSong'
import Users from './components/Users'
import UserSong from './components/UserSong'

import { State, types } from './redux'
import UITabs from '../components/ui-tabs'

type Props = State & typeof roomActions & RouteComponentProps<{id: string}>

class Room extends React.Component<Props, {}> {
  componentDidMount() {
    this.props.joinRoom(this.props.match.params.id, types.JOIN_ROOM_OK, types.JOIN_ROOMS_ERR)
  }

  render() {
    const { base: { id } } = this.props
    if (!id) {
      return null
    }

    return(
      <Flex
        flexDirection={['column-reverse', 'row']}
        justifyContent="space-between"
        mx={[0, -4]}
      >
        <Box px={[0, 4]} width={['100%', '50%']}>
          <Box pb={4}>
            <UserSong roomId={id} />
          </Box>
        </Box>

        <Box px={[0, 4]} width={['100%', '50%']}>
         <Card
            bg="white"
            boxShadow={1}
          >
            <Box mb={4}>
              <Player roomId={id} />
            </Box>

            <UITabs>
              <UITabs.TabList display="flex" justifyContent="space-between">
                <UITabs.Tab>
                  <Flex alignItems="center">
                    <MessageCircle size={16}/>
                    <Text ml={2}>Chat</Text>
                  </Flex>
                </UITabs.Tab>
                <UITabs.Tab>
                  <Flex alignItems="center">
                    <Radio size={16}/>
                    <Text ml={2}>Queue</Text>
                  </Flex>
                </UITabs.Tab>
                <UITabs.Tab active="true">
                  <Flex alignItems="center">
                    <User size={16} />
                    <Text ml={2}>Users</Text>
                  </Flex>
                </UITabs.Tab>
                <UITabs.Tab>
                  <Flex alignItems="center">
                    <RotateCw size={16} />
                    <Text ml={2}>History</Text>
                  </Flex>
                </UITabs.Tab>
              </UITabs.TabList>

              <UITabs.TabPanels>
                <UITabs.TabPanel>
                  <Box p={4}>Chat!</Box>
                </UITabs.TabPanel>
                <UITabs.TabPanel>
                  <RoomSong roomId={id} />
                </UITabs.TabPanel>
                <UITabs.TabPanel>
                  <Users roomId={id} />
                </UITabs.TabPanel>
                <UITabs.TabPanel>
                  <Box p={4}>History!</Box>
                </UITabs.TabPanel>
              </UITabs.TabPanels>
            </UITabs>
          </Card>
        </Box>
      </Flex>
    )
  }
}

type MapStateToProps = (state: RootState) => State
const mapStateToProps: MapStateToProps = (state) => state.room

export default connect<State, typeof roomActions, {}>(
  mapStateToProps,
  roomActions
)(Room)
