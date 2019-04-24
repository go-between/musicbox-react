import * as React from 'react'
import { connect } from 'react-redux'
import system from '@rebass/components'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@reach/tabs'
import uuid from 'uuid/v4'

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
        <Tabs>
          <TabList>
            <Tab>My Library</Tab>
            <Tab>My Queue</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Library enqueueSongs={this.enqueueSongs} roomId={this.props.roomId} />
            </TabPanel>
            <TabPanel>
              {this.renderSongs()}
            </TabPanel>
          </TabPanels>
        </Tabs>
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
