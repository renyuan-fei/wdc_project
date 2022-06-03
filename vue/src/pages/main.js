//导入组件
import {createApp} from 'vue'
import App from './App.vue'

//导入axios
import axios from "axios";
import VueAxios from 'vue-axios';

//导入封装的AXIOS
// import AXIOS from './http/AXIOS/API'
//导入路由
import router from '../router/router'

//导入全局样式
import '../assets/css/global.css'
// import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//Element Plus
// eslint-disable-next-line no-unused-vars
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ELIcons from '@element-plus/icons-vue'

// const instance = axios.create({
//     baseURL: '/api',
// });

//----------------------------------------------------------------------------------------------------------------------
//创建Vue主体
const app = createApp(App)
//----------------------------------------------------------------------------------------------------------------------
//注册组件
for (let iconName in ELIcons)
{
    app.component(iconName, ELIcons[iconName])
}

app.use(ElementPlus)
app.use(VueAxios, axios);
//http://localhost:3000/
//https://renyuan-fei-code50-71182846-jjjppq54gfpgj-8080.githubpreview.dev/
axios.defaults.baseURL = 'http://localhost:3000/';

// eslint-disable-next-line no-unused-vars
let LoadingInstance = null

//请求拦截器
axios.interceptors.request.use(config =>
{
    //在请求头中添加token
    if (sessionStorage.getItem('token'))
    {
        config.headers.token = sessionStorage.getItem('token')

        //添加 loading效果
        // LoadingInstance = ElLoading.service({fullscreen: true})

        return config
    }

    return config
})



//相应拦截器
axios.interceptors.response.use((response) =>
{

    //关闭 loading效果
    // LoadingInstance.close()

    //但返回的状态码为401时，说明token过期，立刻删除token，导航到login界面
    if (response.status === 401)
    {
        window.localStorage.removeItem('token')
        this.$route.push('/login')
    }

    return response
})

app.config.globalProperties.$axios = axios


//----------------------------------------------------------------------------------------------------------------------
//注册路由
app.use(router)


//----------------------------------------------------------------------------------------------------------------------
app.mount('#app')
