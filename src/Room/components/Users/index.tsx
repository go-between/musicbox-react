import * as React from 'react'
import { connect } from 'react-redux'
import system from '@rebass/components'

import { getSingleton } from 'cable'
import { State as RootState } from 'reducers'

import { State, actions } from './redux'

const UserList = system(
  {
    as: 'ul',
    m: 0,
    p: 4,
  },
  {
    listStyleType: 'none'
  },
  'space'
)

const UserItem = system(
  {
    as: 'li'
  }
)

type PassedProps = { roomId: string }
type Props = State & PassedProps & typeof actions
class Player extends React.Component<Props, {}> {
  componentDidMount() {
    const client = getSingleton()
    client.subscribeTo('player').users(this.props.roomId, actions.updateUsers)
  }

  render() {
    const users = this.props.users.map(u => <UserItem key={u.id}>{u.email}</UserItem>)

    return (
      <UserList>
        {users}
      </UserList>
    )
  }
}

type MapStateToProps = (state: RootState) => State
const mapStateToProps: MapStateToProps = (state) => state.room.users

export default connect<State, typeof actions, PassedProps>(
  mapStateToProps,
  actions,
)(Player)
