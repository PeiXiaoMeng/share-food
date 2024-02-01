// import { View, Text, Image } from '@tarojs/components'
// import Taro, { useLoad } from '@tarojs/taro'
// import { useState } from 'react'
// import './index.less'

// import headUrl from "../../assets/head.jpg";
// import food from '../../assets/food.png';




import Taro from '@tarojs/taro';
import { View, Text, Image } from "@tarojs/components";
import { useState, useEffect } from "react";
import { http } from '../../utils';
import { getCreateId } from '../../utils';

import basketImg from "../../assets/images/basket.png";
import addImg from "../../assets/images/add.png";
import temp1 from '../../assets/images/tem1.jpg';

import './index.less';

interface ListItem {
  id: number,
  title: string,
}

// const Home = () => {

//   useEffect(() => {
//     // Taro.getSetting({
//     //   success(res) {
//     //     if (!res.authSetting['scope.userLocation']) {
//     //       console.log('===>');
//     //       Taro.authorize({
//     //         scope: 'scope.userLocation',
//     //         success (res) {
//     //           console.log('success');
//     //           console.log(res);
//     //         }
//     //       })
//     //     }
//     //   }
//     // })
//     // Taro.getLocation({
//     //   type: "wgs84",
//     //   success: function (res) {
//     //     let latitude = res.latitude;
//     //     let longitude = res.longitude;
        
//     //     console.log(res);
//     //   },
//     // });

//     // http.get('http://localhost:3030/basketball/api/basketball/field', {}, {})
//     //   .subscribe(({ result }) => {
//     //     setList(result || []);
//     //   })
//   }, [])

//   const pxTransform = (size) => {
//     if (!size && size != 0) return ''
//     const designWidth = 750
//     const deviceRatio = {
//       640: 2.34 / 2,
//       750: 1,
//       828: 1.81 / 2
//     }
//     return `${size / deviceRatio[designWidth]}rpx`
//   }

//   return (
//     <View className="home">
//       <View className="home__notice">
//         <AtNoticebar>
//           点击下面栏目可查看具体球场位置、篮板等信息
//         </AtNoticebar>
//       </View>
//       <View className="home__cont">
//         <AtList>
//           {
//             list.map((item: ListItem) => (
//               <AtListItem title={item.title} arrow='right' onClick={() => linkTo(item.id)} />
//             ))
//           }
//         </AtList>
//       </View> */}
//     </View>
//   )
// }

const Home = () => {

  const createIds = getCreateId();

  const createLabel = (i: number) => {
    if (i === 0) return 'https://img.js.design/assets/element/js_atV8QTZZQxb/image/bab1fcad9d71c32d5f8fe28737cad5fb611ef060.png';
    
    if (i === 1) return 'https://img.js.design/assets/element/js_j-obUbnpwuA/image/2c2f2a1fc177301ae67d50bc36e82d38a131c202.png';

    if (i === 2) return 'https://img.js.design/assets/element/js_Hplv55YiUhz/image/c370f87829818a7663f299fff98cf766b20203a9.png';

    return 'https://img.js.design/assets/element/js_7ZuvNUuskUi/image/ba4036b4183191ec78b297165a0c1a11118694ac.png';
  }
  const [list, setList] = useState([]);
  const [cond, setCond] = useState({});
  const [height, setHeight] = useState(0);
  const noneImgList = ['https://images.unsplash.com/photo-1546519638-68e109498ffc?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmFza2V0YmFsbHx8fHx8fDE2OTAwNzQwNjk&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600', 'https://images.unsplash.com/photo-1518063319789-7217e6706b04?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8Y2FtcHVzLGJhc2tldGJhbGwsY291cnR8fHx8fHwxNjg5OTMxNjgz&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600', 'https://images.unsplash.com/photo-1587896661064-2d686db621b4?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmFza2V0YmFsbHx8fHx8fDE2OTAwNzQyMDk&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600', 'https://images.unsplash.com/photo-1519861531473-9200262188bf?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YmFza2V0YmFsbHx8fHx8fDE2OTAwNzQyNDI&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600', basketImg]

  useEffect(() => {
    setHeight(Taro.getSystemInfoSync().windowHeight);
  }, [])

  useEffect(() => {
    http.get('condition', {}, {}).subscribe(({ result }) => {
      console.log('condition');
      console.log(result);
      setCond(result);
      Taro.setStorageSync('condition', result);
      http.get('field', {}, {})
        .subscribe(({ result: res }) => {
          if (!res) return;
          console.log(res);
          setList(res);
        })
    })
  }, [])

  const linkTo = (id?: number) => {
    if (id) {
      Taro.navigateTo({ 
        url: `/pages/detail/index?id=${id}`,
      })
    }

    Taro.navigateTo({ 
      url: `/pages/content/index`,
    })
  }

  return (
    <View className='home'>
      <View className="home__bg">
        <Image className='home__bgImg' src={temp1}></Image>
      </View>
      <Image className="home__img" src={addImg} onClick={() => linkTo()}></Image>
      <View
        className='home__header'
        style={{
          height: `calc(${Taro.getSystemInfoSync().statusBarHeight}px)`,
        }}
      />
      <View className="home__posi">
        <Image className="home__posi-img" src="https://gjscrm-1256038144.cos.ap-beijing.myqcloud.com/common/1640328266029/f5b14457-6e2f-41b1-b67e-1be26709f5f8.png"></Image>
        <View className="home__posi-box">
          <Text className="posi-title">北京市</Text>
          <Text className="posi-desc">北京市朝阳区</Text>
        </View>
      </View>
      <View className='cont' style={{
        height: height + 'px',
      }}>
        {
          list.map((v: any, idx: number) => {
            return (
              <View className='cont__item' key={idx} onClick={() => linkTo(idx)}>
                <View className='cont__labelBox'>
                  <Image className="cont__label" src={createLabel(idx)}></Image>
                  <Text className='cont__idx'>{idx + 1}</Text>
                </View>
                <View className="cont__img">
                 <Image className="cont__img" src={v.img || noneImgList[createIds()]}></Image>
                </View>
                <View className='cont__right'>
                  <Text className='cont__rightTitle'>{v.title}</Text>
                  <View className='sign-box'>
                    {
                      (v.sign || []).map((item: any, id: number) => {
                        return (
                          <View className='sign'>
                            <Text className='sign__text'>{cond && cond[Number(item)]}</Text>
                          </View>
                        )
                      })
                    }
                  </View>
                  <Text className='cont__rightDesc'>{v.desc}</Text>
                </View>
              </View>
            )
          })
        }
      </View>
    </View>
  )
}

export default Home;
