import { createRouter, createWebHashHistory } from 'vue-router';
import { ElMessage } from 'element-plus'

const route = [
    // {
    //     path: '/',
    //     name: 'login',
    //     component: ()=> import('../components/LOGIN')
    // }
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../components/HOME'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../components/LOGIN')
    },
    {
        path: '/user',
        name: 'user',
        component: () => import('../components/USER')
    },
    {
        path: '/calendar',
        name: 'calendar',
        component: () => import('../components/CALENDAR')
    },
]

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes: route
});

router.beforeEach((to,from,next) =>
{
    //to 将要访问的路径
    //from 从哪个路径跳转来
    //next 表示通过

    if (to.path === '/login' || to.path === '/home')
    {
        return next();
    }

    //获取token
    const token = window.sessionStorage.getItem('token');

    // console.log(token)

    //当没有token时，强制跳转到login
    if (!token)
    {
        ElMessage({
            message: 'Please log in to access',
            type: 'warning',
        })

        console.log('未登录')

        return next('/login');
    }
    else
    {
        next()
    }
})

export default router;