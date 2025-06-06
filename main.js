// #ifndef VUE3
import Vue from 'vue'
import App from './App'
// 导入网络请求包
import {
  $http
} from '@escook/request-miniprogram'

uni.$http = $http

$http.baseUrl = 'https://api-hmugo-web.itheima.net'

// 配置请求拦截器
$http.beforeRequest = function(options) {
  uni.showLoading({
    title: '数据加载中...'
  })
}

// 配置响应拦截器
$http.afterRequest = function() {
  uni.hideLoading()
}

// 配置全局信息提示
uni.$showMsg = function(title = '数据请求错误!', duration = 1500) {
  uni.showToast({
    title,
    duration,
    icon: 'none'
  })
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
  createSSRApp
} from 'vue'

export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif