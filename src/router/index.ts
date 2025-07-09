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
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/admin/login',
      name: 'admin login',
      component: () => import('../views/AdminLoginView.vue'),
      meta: {
        hideHeader: true,
        hideFooter: true,
      },
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue'),

    },
    {
      path: '/car/:id',
      name: 'car',
      component: () => import('../views/CarView.vue')
    },
    {
      path: '/owner/register',
      name: 'owner register',
      component: () => import('../views/RegisterOwner.vue')
    },
    {
      path: '/owner',
      name: 'owner view',
      component: () => import('../views/OwnerView.vue')
    },
    {
      path: '/brand/:id',
      name: 'brand view',
      component: () => import('../views/BrandView.vue')
    },
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