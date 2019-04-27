import * as React from 'react'
import { connect } from 'react-redux'
import { Inbox, List } from 'react-feather'
import { Flex, Text } from 'rebass'
import system from '@rebass/components'
import UITabs from '../../../components/ui-tabs'
import uuid from 'uuid/v4'

import { getSingleton } from 'cable'
import { actions as queueActions } from 'models/queue'
import { Song } from 'models/song'
import { State as RootState } from 'reducers'
import Library from 'Library'

import SongCard from './SongCard'
import { actions, State, types } from './redux'

const SongList = system(
  {
    is: 'ul',
    p: 0,
    m: 0,
  },
  'space'
)

type PassedProps = { roomId: string }
type Actions = typeof queueActions & typeof actions
type Props = Actions & PassedProps & State

class UserSong extends React.Component<Props, {}> {
  componentDidMount() {
    this.props.getUserQueue(types.GET_USER_QUEUE_OK, types.GET_USER_QUEUE_ERR)

    const client = getSingleton()
    client.subscribeTo('userSong').roomSong(this.props.roomId, this.props.updateUserSongs)
  }

  enqueueSongs = (songs: Song[]) => {
    const enqueues = songs.map(song => ({
      id: uuid(),
      song
    }))
    this.props.enqueueSongs(enqueues)
    this.props.updateQueue()
  }

  moveSongCard = (dragIndex: number, hoverIndex: number) => {
    this.props.updateOrder(dragIndex, hoverIndex)
    this.props.updateQueue()
  }

  renderSongs = () => {
    const { enqueuedSongs } = this.props
    if (enqueuedSongs.length === 0) {
      return null
    }

    const songList = enqueuedSongs.map((queue, i) => {
      const { id, song: { name } } = queue
      const removeSong = () => {
        this.props.removeQueue(id)
      }

      return (
        <SongCard
          key={id}
          index={i}
          id={id}
          moveCard={this.moveSongCard}
          removeSong={removeSong}
        >
          {name}
        </SongCard>
      )
    })

    return (
      <SongList>
        {songList}
      </SongList>
    )
  }

  render() {
    return(
      <>
        <UITabs p={2}>
          <UITabs.TabList>
            <UITabs.Tab>
              <Flex alignItems="center">
                <Inbox size={16} />
                <Text ml={2}>Inbox</Text>
              </Flex>
            </UITabs.Tab>

            <UITabs.Tab>
              <Flex alignItems="center">
                <List size={16} />
                <Text ml={2}>My Queue</Text>
              </Flex>
            </UITabs.Tab>
          </UITabs.TabList>

          <UITabs.TabPanels>
            <UITabs.TabPanel>
              <Library enqueueSongs={this.enqueueSongs} roomId={this.props.roomId} />
            </UITabs.TabPanel>

            <UITabs.TabPanel>
              {this.renderSongs()}
            </UITabs.TabPanel>
          </UITabs.TabPanels>
        </UITabs>
      </>
    )
  }
}

type MapStateToProps = (state: RootState) => State
const mapStateToProps: MapStateToProps = (state) => state.room.userSong

export default connect<State, Actions, PassedProps>(
  mapStateToProps,
  { ...actions, ...queueActions },
)(UserSong)
