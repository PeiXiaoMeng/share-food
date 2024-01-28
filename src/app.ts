import { PropsWithChildren } from 'react'
import Taro, { useLaunch } from '@tarojs/taro'
import { http } from './utils';
import './app.less'

function App({ children }: PropsWithChildren<any>) {

  useLaunch(() => {
    console.log('App launched.')

    Taro.login({
      success (res) {
        if (res.code) {
          http.post('user', {
            code: res.code
          }, {})
            .subscribe(({ result }) => {
              console.log(result);
              if (result && result.avatarUrl && result.nickName) {
                Taro.setStorageSync('token', {
                  headUrl: result.avatarUrl,
                  nickName: result.nickName,
                  token: result.token,
                });
              }
            })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  })

  // children 是将要会渲染的页面
  return children
}

export default App
