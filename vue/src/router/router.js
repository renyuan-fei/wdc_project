import {createRouter, createWebHashHistory} from 'vue-router';
import {ElMessage} from 'element-plus'
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-unused-vars
import cookies from "vue-cookies";

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
        component: () => import('../components/USER'),
        redirect: 'my_plan',
        children: [
            {
                path: '/my_plan',
                name: 'my_plan',
                component: () => import('../components/user-components/MY_PLAN'),
                props: true
            },
            {
                path: '/all_plan',
                name: 'public_plan',
                component: () => import('../components/user-components/PUBLIC_PLAN'),
                props: true
            },
            {
                path: '/management',
                name: 'management',
                component: () => import('../components/user-components/MANAGEMENT'),
                props: true
            },
            {
                path: '/my_detail',
                name: 'my_detail',
                component: () => import('../components/user-components/SETTING'),
                props: true
            },
        ]
    },
    // element ui
    {
        path: '/calendar',
        name: 'calendar',
        component: () => import('../components/FULL_CALENDAR')
    },

    // element ui
    {
        path: '/temp',
        name: 'temp',
        component: () => import('../components/CALENDAR')
    },

    //google calendar
    {
        path: '/temp2',
        name: 'temp2',
        component: () => import('../components/GOOGLE')
    },
    //?????????????????????
    {
        path: '/test',
        name: 'test',
        component: () => import('../components/TEST_PAGE'),
    },
]

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes: route
});

router.beforeEach((to, from, next) =>
{
    //to ?????????????????????
    //from ????????????????????????
    //next ????????????

    if (to.path === '/login' || to.path === '/home')
    {
        return next();
    }

    //??????token
    const cookie = cookies.get("Tree")

    console.log('cookie', cookie)

    //?????????token?????????????????????login
    if (!cookie)
    {
        window.localStorage.clear()
        ElMessage({
            message: 'Please log in to access',
            type: 'warning',
        })

        console.log('?????????')

        return next('/login');
    } else
    {
        next()
    }
})

export default router;