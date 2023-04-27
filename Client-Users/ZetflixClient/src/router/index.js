import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import DetailView from '../views/DetailView.vue'
import FavoriteView from '../views/FavoriteView.vue'
import NotFound from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/movies/:id',
      name: 'detail',
      component: DetailView
    },
    {
      path: '/favorites',
      name: 'favorite',
      component: FavoriteView
    },
    { path: '/:pathMatch(.*)*', 
      name: 'NotFound', 
      component: NotFound 
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!localStorage.getItem('access_token') && to.name === 'favorite') {
    next({ name: 'login' })
  } else if (localStorage.getItem('access_token') && to.name === 'login' || localStorage.getItem('access_token') && to.name === 'register') {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
