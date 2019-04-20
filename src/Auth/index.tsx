import * as React from 'react';
import { connect } from 'react-redux'
import { Box, Button, Card } from 'rebass'
import { RouteComponentProps } from 'react-router'
import Input from '../components/input'
import Label from '../components/label'
import Section from '../components/section'
import Wrapper from '../components/wrapper'

import { State as RootState } from '../reducers'
import { actions, State } from './redux'

type Props = State & typeof actions & RouteComponentProps<{state: string}>

class Room extends React.Component<Props, {}> {
  changeField = (field: keyof State) => (event: React.FormEvent<HTMLInputElement>) => {
    this.props.changeField(field, event.currentTarget.value)
  }

  renderError() {
    if (!this.props.error) {
      return null
    }

    return <Box>
      Error:  {this.props.error}
    </Box>
  }

  signIn = () => {
    this.props.signIn(this.props.location.state.redirect)
  }

  render() {
    return(
      <>
        <Section bg="offWhite">
          <Wrapper maxWidth="400px">
            <Card
              bg="white"
              boxShadow="0 2px 6px 0 hsla(0,0%,0%,0.2)"
              px={[3, 4]}
              py={4}
            >
              <Box mb={3}>
                <Label>Email</Label>
                <Input type="text" onChange={this.changeField('email')} value={this.props.email} />
              </Box>

              <Box mb={3}>
                <Label>Password</Label>
                <Input type="password" onChange={this.changeField('password')} value={this.props.password} />
              </Box>

              <Box mb={3}>
                <Button
                  bg="purple"
                  color="white"
                  fontSize={2}
                  onClick={this.signIn}
                >
                  Sign In
                </Button>
              </Box>
            </Card>
            {this.renderError()}
          </Wrapper>
        </Section>
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
