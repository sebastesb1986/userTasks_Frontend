import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterUser from '../views/RegisterUser.vue'
import Signin from '../views/Signin.vue'
import Dashboard from '../views/Dashboard.vue'
import Tasks from '../views/TaskView.vue'
import PageNotFound from '../views/PageNotFound.vue'

import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/registeruser',
    name: 'registeruser',
    component: RegisterUser,
    beforeEnter: (to, from, next) =>{
      
      if(store.getters['auth/authenticated']){

        return next({
          name: 'dashboard'
        });

      }

      next();

    }
  },
  {
    path: '/signin',
    name: 'signin',
    component: Signin,
    beforeEnter: (to, from, next) =>{
      
      if(store.getters['auth/authenticated']){

        return next({
          name: 'dashboard'
        });

      }

      next();

    }
  },
  {
    
    path: '/tasks',
    name: 'tasks',
    component: Tasks,
    beforeEnter: (to, from, next) =>{
      
      if(!store.getters['auth/authenticated']){

        return next({
          name: 'signin'
        });

      }

      next();

    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    beforeEnter: (to, from, next) =>{
      
      if(!store.getters['auth/authenticated']){

        return next({
          name: 'signin'
        });

      }

      next();

    }
  },
  { path: '/:pathMatch(.*)*' ,component: PageNotFound }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
