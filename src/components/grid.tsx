import system from '@rebass/components'
import { Flex } from 'rebass'

const Grid = system(
  {
    as: Flex
  },
  'minHeight'
)

Grid.Body = system(
  {
    as: Flex,
    flex: 1,
    flexDirection: ['column', 'row']
  },
  'flexDirection'
)

Grid.Column = system(
  {
    as: 'div'
  },
  'color',
  'flex',
  'order',
  'space',
)

export default Grid
