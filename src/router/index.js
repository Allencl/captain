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
  history: createWebHashHistory(),
  routes
})


router.beforeEach((to, from, next) => {
  next()
})

router.afterEach((to, from, next) => {
  
})


export default router





