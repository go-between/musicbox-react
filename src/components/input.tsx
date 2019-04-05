import system from '@rebass/components'

const Input = system(
  {
    is: 'input',
    border: '1px solid',
    borderColor: 'grayLight',
    boxShadow: '0 2px 4px 0 hsla(0,0%,0%,0.2)',
    borderRadius: 4,
    display: 'block',
    p: 2,
    width: '100%',
  },
  'border',
  'borderColor',
  'boxShadow',
  'borderRadius',
  'color',
  'display',
  'maxWidth',
  'space',
  'width'
)

export default Input
