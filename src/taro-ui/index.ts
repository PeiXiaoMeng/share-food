import Taro from '@tarojs/taro'
import './style/index.scss'
import './style/themes/red.scss'
import './style/themes/purple.scss'

Taro.initPxTransform({ designWidth: 750, deviceRatio: {} })

export { default as AtFloatLayout } from './components/float-layout'
export { default as AtInput } from './components/input'
export { default as AtList } from './components/list'
export { default as AtListItem } from './components/list/item'
export { default as AtModal } from './components/modal'
export { default as AtModalHeader } from './components/modal/header'
export { default as AtModalContent } from './components/modal/content'
export { default as AtModalAction } from './components/modal/action'
export { default as AtProgress } from './components/progress'
export { default as AtTabs } from './components/tabs'
export { default as AtTabsPane } from './components/tabs-pane'
export { default as AtSlider } from './components/slider'
export { default as AtSearchBar } from './components/search-bar'
export { default as AtIndexes } from './components/indexes'
export { default as AtNoticebar } from './components/noticebar'
export { default as AtTextarea } from './components/textarea'
export { default as AtImagePicker } from './components/image-picker'
export { default as AtInputNumber } from './components/input-number'
export { default as AtButton } from './components/button'

/* 私有的组件  */
export { default as AtComponent } from './common/component'
