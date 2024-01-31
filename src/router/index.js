import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'



const routes = [
  {
    path:'/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    meta:{tittle:"首页",keepAlive:true},
    component: () => import('@/layout/Home.vue')
  },
  {
    path: '/computer',
    name: 'computer',
    meta:{tittle:"计算",keepAlive:true},
    component: () => import('@/views/computer/index.vue')
  },
  {
    path: '/message',
    name: 'message',
    meta:{tittle:"消息",keepAlive:true},
    component: () => import('@/views/message/index.vue')
  },

  {
    path: '/forx',
    name: 'forx',
    meta:{tittle:"FORX",keepAlive:true},
    component: () => import('@/views/forx.vue')
  },



  {
    path: '/404',
    name:'404',
    meta:{tittle:"页面丢失了",keepAlive:true},
    component:()=> import('@/layout/404.vue')
  },
  {
    path:'/:pathMatch(.*)',
    redirect: '/404'
  }
]


const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  mode: process.env.IS_ELECTRON ? 'hash' : 'history',
  history: createWebHashHistory(),
  routes
})


router.beforeEach((to, from, next) => {
  next()
})

router.afterEach((to, from, next) => {
  
})


export default router






