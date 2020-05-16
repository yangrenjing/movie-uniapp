import Vue from 'vue'
import App from './App'

/* 引入组件页面 */
import home from './pages/component/home/index.vue'
Vue.component('home', home)
import search from './pages/component/search/index.vue'
Vue.component('search', search)
import mine from './pages/component/mine/index.vue'
Vue.component('mine', mine)

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
