import * as React from 'react';
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import system from '@rebass/components'

import Library from '../Library'

import { actions as roomActions } from '../models/room'

import { State as RootState } from '../reducers'
import { State, types } from './redux'

const Container = system({
  is: 'div',
  display: ['block', 'flex'],
  flex: '1',
})

// const UserList = system({
//   is: 'ul'
// })

// const UserItem = system({
//   is: 'li'
// })

type Props = State & typeof roomActions & RouteComponentProps<{id: string}>

class Room extends React.Component<Props, {}> {
  componentDidMount() {
    this.props.joinRoom(this.props.match.params.id, types.JOIN_ROOM_OK, types.JOIN_ROOMS_ERR)
  }

  // renderUsers = () => {
  //   const { users } = this.props
  //   if (users.length === 0) {
  //     return
  //   }

  //   const userList = users.map(u => <UserItem key={u.email}>{u.email}</UserItem>)

  //   return (
  //     <>
  //       <div>
  //         Song Library:
  //
  //       </div>
  //       <div>
  //         Active Users:
  //         <UserList>
  //           {userList}
  //         </UserList>
  //       </div>
  //     </>
  //   )
  // }

  render() {
    if (!this.props.id) {
      return null
    }

    return(
      <>
        <Container>
          <Library roomId={this.props.id} />
        </Container>
      </>
    )
  }
}

type MapStateToProps = (state: RootState) => State
const mapStateToProps: MapStateToProps = (state) => state.room

export default connect<State, typeof roomActions, {}>(
  mapStateToProps,
  roomActions
)(Room)
