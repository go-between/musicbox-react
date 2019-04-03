import system from '@rebass/components'

const Section = system(
  {
    is: 'section',
    position: 'relative',
    p: [4, 5]
  },
  'backgroundImage',
  'backgroundPosition',
  'backgroundRepeat',
  'backgroundSize',
  'border',
  'borderTop',
  'color',
  'height',
  'minHeight',
  'space',
)

export default Section
