import Vue from 'vue';
import Router from 'vue-router';
import Projects from '../views/Projects.vue';
import Login from '../views/Login.vue';
// import Register from '../views/Register.vue';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/projects'
    },
    {
      path: '/login',
      component: Login
    },
// TODO add register + invite + email verification
//    {
//      path: '/register',
//      component: Register
//    },
    {
      path: '/view',
      name: 'View',
      // lazy-loaded
      component: () => import('../views/View.vue')
    },
    {
      path: '/chat',
      name: 'Chat',
      // lazy-loaded
      component: () => import('../views/Chat.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      // lazy-loaded
      component: () => import('../views/Profile.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      // lazy-loaded
      component: () => import('../views/Admin.vue')
    },
    {
      path: '/project-settings',
      name: 'Project-Settings',
      // lazy-loaded
      component: () => import('../views/ProjectSettings.vue')
    },
    {
      path: '/projects',
      name: 'projects',
      component: Projects
    }
  ]
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/home'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});
export default router
