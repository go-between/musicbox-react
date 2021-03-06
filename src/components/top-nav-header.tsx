import * as React from 'react'
import { connect } from 'react-redux'
import { User } from 'react-feather'
import system from '@rebass/components'
import { Box, Flex, Image } from 'rebass'

import { actions as songActions } from 'models/song'
import { types as libraryTypes } from 'Library/redux'
import { State as RootState } from 'reducers'
import { State as AuthState } from 'Auth/redux'

import YoutubeSearch from '../YoutubeSearch'
import Container from './container'
import Icon from './icon'
import Logo from '../../public/Logo.png'

const Header = system(
  {
    as: 'header',
    bg: 'white',
    boxShadow: 1,
    py: 3,
  },
  'boxShadow',
  'color',
  'display',
  'space'
)

Header.Logo = system(
  {
    as: 'a',
    alignItems: 'center',
    color: 'offBlack',
    display: 'flex',
    fontSize: 1,
    fontWeight: 'bold',
    textStyle: 'uppercase',
  },
  {
    textDecoration: 'none',
  },
  'alignItems',
  'color',
  'display',
  'fontSize',
  'fontWeight',
  'textStyle',
  'space',
)

Header.LogoIcon = system(
  {
    as: Flex,
    alignItems: 'center',
    borderRadius: '100%',
    boxShadow: 1,
    bg: 'purple',
    color: 'white',
    justifyContent: 'center',
    p: 2,
  },
  'borderRadius',
  'boxShadow',
)

const YoutubeSearchWrapper = system(
  {
    as: Flex,
    flex: 1,
    mx: 3,
  },
  {
    position: 'relative'
  }
)

type Props = typeof songActions

class TopNavHeader extends React.Component<Props, {}> {
  createSong = (youtubeId: string, options: {}) => {
    const opts = { ...options, returnOK: libraryTypes.GET_SONG_OK }
    this.props.createSong(youtubeId, opts)
  }

  render() {
    return (
      <Header>
        <Container
          alignItems="center"
          display="flex"
          justifyContent="space-between"
        >
          <Header.Logo href="/lobby">
            <Image
              alt="MusicBox"
              src={Logo}
              borderRadius="100%"
              height="50px"
              width="50px"
            />
          </Header.Logo>

          <YoutubeSearchWrapper>
            <YoutubeSearch createSong={this.createSong} />
          </YoutubeSearchWrapper>

          <Box>
            <Icon
              bg="white"
              border="2px solid"
              borderColor="purple"
              borderRadius="100%"
              color="purple"
            >
              <User size={20} />
            </Icon>
          </Box>
        </Container>
      </Header>
    )
  }
}

type MapStateToProps = (state: RootState) => AuthState
const mapStateToProps: MapStateToProps = (state) => state.auth

export default connect<AuthState, typeof songActions, {}>(
  mapStateToProps,
  songActions,
)(TopNavHeader)
