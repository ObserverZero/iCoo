import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/calendar'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/calendar'
      },
      {
        path: 'calendar',
        component: () => import('@/views/Calendar.vue')
      },
      {
        path: 'groups',
        component: () => import('@/views/Groups.vue')
      },
      {
        path: 'people',
        component: () => import('@/views/People.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
