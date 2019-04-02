import * as React from 'react';
import { connect } from 'react-redux'
import system from '@rebass/components'

import { State as RootState } from '../reducers'
import { actions, State } from './redux'

const Container = system({
  is: 'div',
  display: ['block', 'flex'],
  flex: '1',
})

type Props = State & typeof actions

class Room extends React.Component<Props, {}> {
  changeField = (field: keyof State) => (event: React.FormEvent<HTMLInputElement>) => {
    this.props.changeField(field, event.currentTarget.value)
  }

  renderError() {
    if (!this.props.error) {
      return null
    }

    return <Container>
      Error:  {this.props.error}
    </Container>
  }

  render() {
    return(
      <>
        <Container>
          Email: <input type="text" onChange={this.changeField('email')} value={this.props.email} />
          Password: <input type="password" onChange={this.changeField('password')} value={this.props.password} />
        </Container>
        <Container>
          <button onClick={this.props.signIn}>Sign In</button>
        </Container>
        {this.renderError()}
      </>
    )
  }
}

type MapStateToProps = (state: RootState) => State
const mapStateToProps: MapStateToProps = (state) => state.auth

export default connect<State, typeof actions, {}>(
  mapStateToProps,
  actions,
)(Room)
