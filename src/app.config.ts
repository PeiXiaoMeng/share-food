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
    "selectedColor": "#FE6057",
    list: [{
      pagePath: 'pages/index/index',
      text: '首页',
      iconPath: 'assets/home.png',
      selectedIconPath: 'assets/home_select.png'
    }, {
      pagePath: 'pages/self/index',
      text: '我的',
      iconPath: 'assets/my.png',
      selectedIconPath: 'assets/my_select.png'
    }]
  }
})
