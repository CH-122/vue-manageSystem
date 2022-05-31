import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import chRequest from './services'
// import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// import * as ELIcons from '@element-plus/icons-vue'

// 自动按需使用elementui组件使用服务端方式调用ELLoading和ElMessang时需引入对应样式
import 'element-plus/theme-chalk/el-loading.css'
import 'element-plus/theme-chalk/el-message.css'

/* 全局引用 */
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

// createApp(App).mount('#app')

const app = createApp(App)

app.use(router)
app.use(store)
// app.use(ElementPlus)

// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//   app.component(key, component)
// }
// for (const name in ELIcons) {
//   app.component(name, (ELIcons as any)[name])
// }

app.mount('#app')

console.log(process.env.VUE_APP_NAME)

chRequest.request({
  url: '/home/multidata',
  method: 'get'
})
