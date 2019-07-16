import * as React from 'react'
import { connect } from 'react-redux'
// import system from '@rebass/components'
import { Box } from 'rebass'

import { actions as queueActions } from 'models/queue'
import { State as RootState } from 'reducers'

import { State, types } from './redux'

type PassedProps = { roomId: string }
type Props = State & PassedProps & typeof queueActions
class History extends React.Component<Props, {}> {

  componentDidMount() {
    this.props.getHistory(types.GET_HISTORY_OK, types.GET_HISTORY_ERR)
  }

  renderHistory = () => {
    const { historicalSongs } = this.props
    if (historicalSongs.length === 0) {
      return null
    }

    const songHistory = historicalSongs.map((historicalSong) => {
      const { id, song: { name } } = historicalSong

      return (
        <Box
          key={id}
        >
          {name}
        </Box>
      )
    })

    return (
      songHistory
    )
  }

  render() {
    return (
      <>
        {this.renderHistory()}
      </>
    )
  }
}

type MapStateToProps = (state: RootState) => State
const mapStateToProps: MapStateToProps = (state) => state.room.history

export default connect<State, typeof queueActions, PassedProps>(
  mapStateToProps,
  queueActions,
)(History)
