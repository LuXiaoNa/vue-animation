import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import lesFrontUtils from "les-front-utils";
Vue.use(lesFrontUtils)
// 组件全局注册
import '@/styles/common.css'
Vue.config.productionTip = false
import Element from 'element-ui'
Element.Dialog.props.closeOnClickModal.default = false
Vue.use(Element)
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts

// 开发环境下使用mock.js
// if(process.env.NODE_ENV=="development"){
//   const {mockXHR}=require('../mock')
//   mockXHR()
// }
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
}).$mount('#app')
Vue.prototype.$praseStrEmpty = function (str) {
    if (typeof str === 'undefined' || str === null) {
        return "";
    }
    return str;
}