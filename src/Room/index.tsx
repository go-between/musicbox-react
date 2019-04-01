import * as React from 'react';
import { connect } from 'react-redux'
import system from '@rebass/components'

import Library from '../Library'

import { actions as userActions } from '../models/user'

import { State as RootState } from '../reducers'
import { State, types } from './redux'

const Container = system({
  is: 'div',
  display: ['block', 'flex'],
  flex: '1',
})

const UserList = system({
  is: 'ul'
})

const UserItem = system({
  is: 'li'
})

type Props = State & typeof userActions

class Room extends React.Component<Props, {}> {
  componentWillMount() {
    this.props.getUsers(types.GET_USER_OK, types.GET_USERS_ERR)
  }

  renderUsers = () => {
    const { users } = this.props
    if (users.length === 0) {
      return
    }

    const userList = users.map(u => <UserItem key={u.email}>{u.email}</UserItem>)

    return (
      <>
        <div>
          Song Library:
          <Library />
        </div>
        <div>
          Active Users:
          <UserList>
            {userList}
          </UserList>
        </div>
      </>
    )
  }

  render() {
    return(
      <>
        <Container>
          {this.renderUsers()}
        </Container>
      </>
    )
  }
}

type MapStateToProps = (state: RootState) => State
const mapStateToProps: MapStateToProps = (state) => state.room

export default connect<State, typeof userActions, {}>(
  mapStateToProps,
  userActions
)(Room)
