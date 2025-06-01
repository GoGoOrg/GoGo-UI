import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
   
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/car',
      name: 'car',
      component: () => import('../views/CarView.vue')
    },
    {
      path: '/owner/register',
      name: 'owner register',
      component: () => import('../views/RegisterOwner.vue')
    }
    
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      // Scroll to the saved position if navigating back
      return savedPosition;
    } else {
      // Scroll to top when navigating to a new route
      return { top: 0 };
    }
  },
})

export default router