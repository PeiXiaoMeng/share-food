import { View, Text, Image, Button } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useState } from 'react'
import { http } from '../../utils';
import './index.less'

import normalUrl from "../../assets/head.jpg";

export default function Index() {

  const tabList = [{
    title: '我的发布',
  }, {
    title: '设置',
  }]
  const [nickName, setNickName] = useState('');
  const [headUrl, setHeadUrl] = useState('');

  useLoad(() => {
    console.log('Page loaded.')
    const token = Taro.getStorageSync('token');
    console.log(token);
    if (token) {
      const { headUrl: url, nickName: name } = token;
      setNickName(name);
      setHeadUrl(url);
    }
  })

  const handleWXGetUserInfo = () => {
    Taro.login({
      success: res => {
        const code = res.code;
        Taro.getUserInfo({
          success: (user) => {
            const { iv, encryptedData } = user;
            http.post('login', {
              code,
              iv,
              encryptedData,
            }, {})
              .subscribe(({ result }) => {
                if (!result) return;
                const { avatarUrl, nickName: name } = result;
                if (avatarUrl && name) {
                  Taro.setStorageSync('token', {
                    headUrl: avatarUrl,
                    nickName: name,
                  });
                  setNickName(name);
                  setHeadUrl(avatarUrl);
                }
              })
          }
        })
      }
    })
  }

  return (
    <View className='self'>
      <View className='self__bg'>
        <Image className='self__head' src={nickName ? headUrl : normalUrl}></Image>
        {
          nickName ? 
          <View>
            <Text className='self__name'>{nickName}</Text>
          </View> :
          <View className='self__btnView'>
             <Button className='self__btn' onClick={() => handleWXGetUserInfo()}></Button>  
             <Text>请登录</Text>
          </View>

        }
      </View>

      <View className='self__ul'>
        {
          tabList.map((tab, index) => (
            <View key={index} className='self__li'>
              <Text className='self__text'>{tab.title}</Text>
              <Image className='self__right' src={require('../../assets/more-about.png')}></Image>
            </View>
          ))
        }
      </View>
    </View>
  )
}
