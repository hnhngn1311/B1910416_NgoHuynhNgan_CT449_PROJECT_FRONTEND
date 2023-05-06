import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'onboarding',
      component: () => import('@/views/OnboardingView.vue')
    },
    {
      path: '/adminstrator',
      name: 'adminstrator',
      component: () => import('@/views/admin/AdminView.vue'),
      children: [
        {
          path: '',
          name: 'admins',
          component: () => import('@/views/admin/DashboardView.vue')
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('@/views/admin/DashboardView.vue')
        },
        {
          path: 'rooms',
          name: 'rooms',
          component: () => import('@/views/admin/RoomView.vue')
        },
        {
          path: 'booking_room',
          name: 'booking_room',
          component: () => import('@/views/admin/BookingRoomView.vue')
        },
        {
          path: 'term',
          name: 'term',
          component: () => import('@/views/admin/TermView.vue')
        }
      ]
    }
  ]
})

export default router
