import {
  createRouter as createVueRouter,
  createWebHashHistory,
  Router,
} from "vue-router";
import Home from "../views/Home.vue";
import Profile from "../views/Profile.vue";
import { createAuthGuard } from "@auth0/auth0-vue";
import { App } from "vue";
import CalendarView from "../views/CalendarView.vue";

export function createRouter(app: App): Router {
  return createVueRouter({
    routes: [
      {
        path: "/",
        name: "home",
        component: Home,
      },
      {
        path: "/profile",
        name: "profile",
        component: Profile,
        beforeEnter: createAuthGuard(app),
      },
      {
        path: "/calendar",
        name: "calendar",
        component: CalendarView,
        // Puedes agregar 'beforeEnter' si necesitas algún guard específico para esta ruta
      },
    ],
    history: createWebHashHistory(),
  });
}
