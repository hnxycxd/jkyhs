import { useGlobalIconFont } from './assets/iconfont/helper';

export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/list/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#5FA3F6',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'white'
  },
  usingComponents: Object.assign(useGlobalIconFont())

})
