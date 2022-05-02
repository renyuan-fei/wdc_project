//导入组件
import {createApp} from 'vue'
import App from './App.vue'

//导入axios
import axios from "axios";
import VueAxios from 'vue-axios';

//导入封装的AXIOS
// import AXIOS from './http/AXIOS/API'

//导入路由
import router from '../../router/router'

//导入全局样式
import '../../assets/css/global.css'
// import * as ElementPlusIconsVue from '@element-plus/icons-vue'

//Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//----------------------------------------------------------------------------------------------------------------------
//创建Vue主体
const app = createApp(App)
//----------------------------------------------------------------------------------------------------------------------
//注册组件
app.use(ElementPlus)
app.use(VueAxios,axios);
app.config.globalProperties.$axios = axios



//----------------------------------------------------------------------------------------------------------------------
//注册路由
app.use(router)


//----------------------------------------------------------------------------------------------------------------------
app.mount('#login')
