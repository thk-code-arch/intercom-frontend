import Vue from "vue";
import Router from "vue-router";
import Projects from "../views/Projects.vue";
import Login from "../views/Login.vue";
import TheView from "../views/TheView.vue";
import Chat from "../views/Chat.vue";
import Admin from "../views/Admin.vue";
import Profile from "../views/Profile.vue";
import ProjectSettings from "../views/ProjectSettings.vue";

import Learning from "../views/Learning.vue";
import ListLearning from "../components/learning/list-learnings.vue";
import ShowLearning from "../components/learning/show-learning.vue";
import AddLearning from "../components/learning/add-learning.vue";

Vue.use(Router);

export const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/projects",
    },
    {
      path: "/login",
      component: Login,
    },
    {
      path: "/view",
      name: "TheView",
      component: TheView,
    },
    {
      path: "/chat",
      name: "Chat",
      component: Chat,
    },
    {
      path: "/learning",
      name: "Learning",
      redirect: "/learning/list",
      component: Learning,
      children: [
        {
          path: "list",
          component: ListLearning,
        },
        {
          path: "show/:id",
          component: ShowLearning,
        },
        {
          path: "add",
          component: AddLearning,
        },
      ],
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
    },
    {
      path: "/admin",
      name: "admin",
      component: Admin,
    },
    {
      path: "/new-project",
      name: "new-project",
      component: ProjectSettings,
    },
    {
      path: "/project-settings",
      name: "project-settings",
      component: ProjectSettings,
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
  const authRequired = !publicPages.includes(to.path);
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
