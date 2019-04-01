import * as React from 'react';
import { connect } from 'react-redux'
import system from '@rebass/components'

import { State as RootState } from '../reducers'
import { actions, State } from './redux'

const Input = system({
  is: 'input',
})
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

      return (
        <li key={result.id}>
          <div onClick={onClick}>
            {result.title} - {result.description}
            <img src={result.image} />
          </div>
        </li>
      )
    })
    return(
      <>
        <Input type="search" value={this.props.query} onChange={this.changeQuery}/>
        <ul>
          {searchResults}
        </ul>
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
