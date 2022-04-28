//导入组件
import {createApp} from 'vue'
import App from './App.vue'

//导入axios
import axios from "axios";
import VueAxios from 'vue-axios'

//导入封装的AXIOS
// import AXIOS from './http/AXIOS/API'

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

//----------------------------------------------------------------------------------------------------------------------
//注册路由



//----------------------------------------------------------------------------------------------------------------------
app.mount('#app')
