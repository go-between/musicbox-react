import system from '@rebass/components'
import { themeGet } from 'styled-system'

const List = system(
  {
    as: 'ul',
    p: 0,
    m: 0,
  },
  {
    listStyleType: 'none',
  },
  'display',
  'space',
  'maxWidth',
  'width',
)

List.Item = system(
  {
    as: 'li',
    p: 0,
    mx: 0,
    mb: 3,
  },
  props => ({
    '&:not(:last-child)': {
      boxShadow: `0px 2px 0px ${themeGet('colors.grayLight')(props)}`
    },
    '&:not(:last-child):hover': {
      boxShadow: 'none',
    }
  }),
  'display',
  'space',
)

export default List
