import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index.js'

Vue.use(VueRouter)

  const routes = [
//   {
//     path: '/',
//     name: 'Home',
//     component: () => import(/* webpackChunkName: "about" */ '../views/Inicio.vue')
//   },
  {
    path: '/',
	redirect: '/login'
  },
  {
    path: '/inicio',
    name: 'Inicio',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Inicio.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/implementacion',
    name: 'Implementacion',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Implementacion.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (store.getters['auth/isLoggedIn']) {
		next()
		return
	}
		next('/login')
	} else {
		next()
	}
})

export default router
