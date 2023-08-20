import {createRouter, createWebHistory} from '@ionic/vue-router';
import {RouteRecordRaw} from 'vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/groups'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/groups'
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
        path: 'group/:id',
        component: () => import('@/views/Group.vue')
      },
      {
        path: 'myprofile',
        component: () => import('@/views/MyProfile.vue')
      },
      {
        path: 'notifications',
        component: () => import('@/views/Notifications.vue')
      },
      {
        path: 'people',
        component: () => import('@/views/People.vue')
      },
      {
        path: 'kickstarters/:id',
        component: () => import('@/views/KickstartArticle.vue')
      },
      {
        path: 'profile/:id',
        component: () => import('@/views/Profile.vue')
      },
      {
        path: 'tabs',
        component: () => import('@/views/TabsPage.vue')
      },
      {
        path: 'welcome',
        component: () => import('@/views/WelcomePage.vue')
        },
      {
        path: 'material',
        component: () => import('@/views/Material.vue')
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
