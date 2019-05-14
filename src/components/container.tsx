
import system from '@rebass/components'
import { Box } from 'rebass'

const Container = system(
  {
    as: Box,
    px: [3, 5],
    mx: 'auto',
    maxWidth: '1080px',
  },
  'alignItems',
  'display',
  'flex',
  'justifyContent',
  'maxWidth',
  'space',
)

export default Container
