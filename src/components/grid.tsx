import system from '@rebass/components'
import { Box, Flex } from 'rebass'

const Grid = system(
  {
    as: Flex,
    height: 'auto',
    flexDirection: ['column', 'row'],
    width: '100%',
  },
  'border',
  'flex',
  'flexDirection',
  'flexWrap',
  'minHeight'
)

Grid.Column = system(
  {
    as: Box,
  },
  'color',
  'flex',
  'order',
  'space',
)

Grid.ColumnAuto = system(
  {
    as: Box,
    alignItems: 'stretch',
    display: 'flex',
    flex: ['100%', '1 0 0px'],
    width: 'auto'
  },
  'color',
  'flex',
  'order',
  'space',
)

export default Grid
