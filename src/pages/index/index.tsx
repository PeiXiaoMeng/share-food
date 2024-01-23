import { View, Text, Image } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useState } from 'react'
import './index.less'

import headUrl from "../../assets/head.jpg";
import food from '../../assets/food.png';

export default function Index() {

  const [list, setList] = useState([{
    headUrl: '../../assets/head.png',
    userName: '美食小管家_1212',
    userLevel: 1,
    title: '山西平遥牛肉点',
    desc: '妩媚价廉，牛肉新鲜，80一斤',
    imgUrl: [food, food, food],
  }, {
    headUrl: '../../assets/head.png',
    userName: '美食小管家_1212',
    userLevel: 1,
    title: '山西平遥牛肉点',
    desc: '妩媚价廉，牛肉新鲜，80一斤',
    imgUrl: [food, food],
  }, {
    headUrl: '../../assets/head.png',
    userName: '美食小管家_1212',
    userLevel: 1,
    title: '山西平遥牛肉点',
    desc: '妩媚价廉，牛肉新鲜，80一斤',
    imgUrl: [food, food],
  }])

  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='index'>
      <View className='list'>
        {
          list && list.length && list.map((item, index) => {
            return <View key={index} className='food' onClick={() => {
              Taro.navigateTo({
                url: '/pages/detail/index',
              })
            }}
            >
              <View className='food__header'>
                <Image className='food__headUrl' src={headUrl}></Image>
                <View className='food__cont'>
                  <Text className='food__userName'>{item.userName}</Text>
                  <Text className='food__label'>{{
                    1: '美食小白',
                    2: '美食达人',
                    3: '美食专家',
                    4: '美食吃货'
                  }[item.userLevel]}</Text>
                </View>
              </View>
              <View className='food__body'>
                <Text className='food__title'>{item.title}</Text>
                <Text className='food__desc'>{item.desc}</Text>
                <View className='food__box'>
                  {
                    item.imgUrl && item.imgUrl.length && item.imgUrl.map((img, key) => {
                      return <Image key={key} className='food__img' src={img}></Image>
                    })
                  }
                </View>
              </View>
            </View>
          })
        }
      </View>
    </View>
  )
}
