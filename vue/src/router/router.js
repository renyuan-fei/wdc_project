import { createRouter, createWebHashHistory } from 'vue-router';

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
        component: ()=> import('../components/HOME')
    },
    {
        path: '/login',
        name: 'login',
        component: ()=> import('../components/LOGIN')
    },
    {
        path: '/user',
        name: 'user',
        component: ()=> import('../components/USER')
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: route
});

export default router;