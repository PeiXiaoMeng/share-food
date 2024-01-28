import Taro from '@tarojs/taro';

/** 直接获取参数 */
export const getParams = (c) => {
  const $instance = Taro.getCurrentInstance()
  let params = {}
  if($instance.router && $instance.router.params) {
    params = $instance.router.params
  }
  return Object.keys(params).reduce((acc, cur) => {
    if ((params[cur] || typeof params[cur] === 'number') && params[cur] !== 'null' && params[cur] !== 'undefined') {
      acc[cur] = params[cur]
    }
    return acc
  }, {}) as any;
}