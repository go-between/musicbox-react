import system from '@rebass/components'

const List = system(
  {
    is: 'ul',
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
    is: 'li',
    p: 0,
    m: 0,
  },
  'display',
  'space',
)

export default List
