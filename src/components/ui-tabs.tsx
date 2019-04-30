import system from '@rebass/components'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@reach/tabs'
import { themeGet } from 'styled-system'

const UITabs = system(
  {
    as: Tabs,
  },
  'space'
)

UITabs.TabList = system(
  {
    as: TabList,
  },
  props => ({
    boxShadow: `0 1px 0 ${themeGet('colors.grayLight')(props)}`,
  }),
  'boxShadow'
)

UITabs.Tab = system(
  {
    as: Tab,
    bg: 'transparent',
    border: 'none',
    px: 2,
    py: 3,
  },
  props => ({
    cursor: 'pointer',
    outlineColor: `${themeGet('colors.purple')(props)}`
  }),
  'boxShadow',
  'border',
  'color',
  'space',
)

UITabs.TabPanels = system(
  {
    as: TabPanels,
  },
)

UITabs.TabPanel = system(
  {
    as: TabPanel,
  }
)

export default UITabs
