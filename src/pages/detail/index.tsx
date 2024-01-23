import { View, Text, Image, Swiper, SwiperItem } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { useState } from 'react'
import './index.less'

import foodImg from '../../assets/food2.png';
import headUrl from "../../assets/head2.jpg";

export default function Index() {

  const [detail, setDetail] = useState({
    headUrl: '../../assets/head.png',
    userName: '美食小管家_1212',
    userLevel: 1,
    title: '山西平遥牛肉点',
    desc: '妩媚价廉，牛肉新鲜，80一斤',
    imgUrl: [foodImg, foodImg, foodImg],
  })


  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='detail'>
      <Swiper
        className='detail__swiper'
        indicatorColor='#999'
        indicatorActiveColor='#333'
        circular
        indicatorDots
        autoplay={false}
      >
          {
            detail && detail.imgUrl && detail.imgUrl.map((item, index) => {
              return (
                <SwiperItem key={index}>
                  <Image
                    className='detail__img'
                    src={item}
                  />
                </SwiperItem>
              )
            })
          }
      </Swiper>
      <View className='food__header'>
        <Image className='food__headUrl' src={headUrl}></Image>
        <View className='food__cont'>
          <Text className='food__userName'>{detail.userName}</Text>
          <Text className='food__label'>{{
            1: '美食小白',
            2: '美食达人',
            3: '美食专家',
            4: '美食吃货'
          }[detail.userLevel]}</Text>
        </View>
      </View>
      <View className='food__body'>
        <Text className='food__title'>{detail.title}</Text>
        <Text className='food__desc'>{detail.desc}</Text>
      </View>
    </View>
  )
}
