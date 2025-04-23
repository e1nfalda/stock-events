import { createRouter, createWebHistory } from 'vue-router'
import EventManagement from '../views/EventManagement.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // Add this new route for root path
    {
      path: '/',
      redirect: '/events' // Automatically redirect to events page
    },
    {
      path: '/events',
      name: 'EventManagement',
      component: EventManagement
    }
  ]
})

export default router