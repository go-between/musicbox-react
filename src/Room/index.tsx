import * as React from 'react';

import system from '@rebass/components'

const Container = system({
  is: 'p',
  display: ['block', 'flex'],
  flex: '1',
})

export default class Room extends React.Component {
  public render() {
    return <Container>Hi</Container>
  }
}
