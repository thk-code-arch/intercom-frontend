// Copyright (c) 2021 Steffen Stein <mail@steffenstein.com> For LICENSE see docs/LICENSE

import Vue from "vue";
import Router from "vue-router";
import Projects from "../views/Projects.vue";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import DirectLogin from "../views/DirectLogin.vue";

Vue.use(Router);

export const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/login",
      component: Login,
    },
    {
      path: "/login/direct/:user/:pass",
      component: DirectLogin,
    },
    {
      path: "/about",
      name: "About",
      // lazy-loaded
      component: () => import("../views/About.vue"),
    },
    {
      path: "/view",
      name: "TheView",
      // lazy-loaded
      component: () => import("../views/TheView.vue"),
    },
    {
      path: "/chat",
      name: "Chat",
      // lazy-loaded
      component: () => import("../views/Chat.vue"),
    },
    {
      path: "/learning",
      name: "Learning",
      redirect: "/learning/list",
      // lazy-loaded
      component: () => import("../views/Learning.vue"),
      children: [
        {
          path: "list",
          component: () => import("../components/learning/list-learnings.vue"),
        },
        {
          path: "show/:id",
          component: () => import("../components/learning/show-learning.vue"),
        },
        {
          path: "add",
          component: () => import("../components/learning/add-learning.vue"),
        },
      ],
    },
    {
      path: "/profile",
      name: "profile",
      // lazy-loaded
      component: () => import("../views/Profile.vue"),
    },
    {
      path: "/admin",
      name: "admin",
      // lazy-loaded
      component: () => import("../views/Admin.vue"),
    },
    {
      path: "/new-project",
      name: "new-project",
      // lazy-loaded
      component: () => import("../views/ProjectSettings.vue"),
    },
    {
      path: "/project-settings",
      name: "project-settings",
      // lazy-loaded
      component: () => import("../views/ProjectSettings.vue"),
    },
    {
      path: "/projects",
      name: "projects",
      component: Projects,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login"];
  const authRequired = !to.path.startsWith(publicPages);
  const loggedIn = localStorage.getItem("user");

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next("/login");
  } else {
    next();
  }
});
export default router;
