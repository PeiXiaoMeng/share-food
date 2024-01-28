export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/self/index',
    'pages/detail/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    "color": "#999999",
    "selectedColor": "#0077c2",
    list: [{
      pagePath: 'pages/index/index',
      text: '首页',
      iconPath: 'assets/home2.png',
      selectedIconPath: 'assets/home_select2.png'
    }, {
      pagePath: 'pages/self/index',
      text: '我的',
      iconPath: 'assets/my2.png',
      selectedIconPath: 'assets/my_select2.png'
    }]
  }
})
