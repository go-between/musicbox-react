import system from '@rebass/components'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@reach/tabs'
import { themeGet } from 'styled-system'

const UITabs = system(
  {
    as: Tabs,
  },
  'alignItems',
  'display',
  'flex',
  'space'
)

UITabs.TabList = system(
  {
    as: TabList,
  },
  props => ({
    boxShadow: `0 1px 0 ${themeGet('colors.grayLight')(props)}`,
  }),
  'alignItems',
  'boxShadow',
  'display',
  'flex',
  'justifyContent',
  'space'
)

UITabs.Tab = system(
  {
    as: Tab,
    bg: 'transparent',
    border: 'none',
    p: 3,
  },
  props => ({
    cursor: 'pointer',
    // outlineColor: `${themeGet('colors.purple')(props)}`
    outline: 'none',
    '&:hover': {
      backgroundColor: `${themeGet('colors.purpleXLight')(props)}`,
      borderTopRightRadius: '4px',
      borderTopLeftRadius: '4px',
    }
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
  'space'
)

UITabs.TabPanel = system(
  {
    as: TabPanel,
  },
  {
    outline: 'none'
  },
  'space'
)

export default UITabs
