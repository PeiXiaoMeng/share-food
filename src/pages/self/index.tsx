import { View, Text, Image } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.less'

import headUrl from "../../assets/head.jpg";

export default function Index() {

  const tabList = [{
    title: '我的发布',
  }, {
    title: '设置',
  }]

  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='self'>
      <View className='self__bg'>
        <Image className='self__head' src={headUrl}></Image>
        <View>
          <Text className='self__name'>请登录</Text>
        </View>
      </View>

      <View className='self__ul'>
        {
          tabList.map((tab, index) => (
            <View key={index} className='self__li'>
              <Text className='self__text'>{tab.title}</Text>
              <Image className='self__right' src={require('../../assets/right.png')}></Image>
            </View>
          ))
        }
      </View>
    </View>
  )
}
