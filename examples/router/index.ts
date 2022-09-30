import { createRouter, createWebHashHistory } from 'vue-router'

import TestPageLy from '@/components/TestPageLy/index'

import TestCom from 'eg/views/TestCom/TestCom'

const routes = [
    {
        path: '/',
        name: 'TestCom',
        component: TestCom,
    },
    {
        path: '/TestPageLy',
        name: 'TestPageLy',
        component: TestPageLy,
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
