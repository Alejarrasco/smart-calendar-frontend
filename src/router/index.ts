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
import SpaceForm from "../views/SpaceForm.vue";
import SubjectForm from "../views/SubjectForm.vue";
import ResponsibleForm from "../views/ResponsibleForm.vue";
import SubjectView from "../views/SubjectView.vue";
import SolicitudeForm from "../views/SolicitudeForm.vue";

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
      {
        path: "/spaceForm",
        name: "spaceForm",
        component: SpaceForm,
        // Puedes agregar 'beforeEnter' si necesitas algún guard específico para esta ruta
      },
      {
        path: "/subjectForm",
        name: "subjectForm",
        component: SubjectForm,
        // Puedes agregar 'beforeEnter' si necesitas algún guard específico para esta ruta
      },
      {
        path: "/responsibleForm",
        name: "responsibleForm",
        component: ResponsibleForm,
      },
      {
        path: "/subjectView",
        name: "subjectView",
        component: SubjectView,
      },
      {
        path: "/solicitudeForm",
        name: "solicitudeForm",
        component: SolicitudeForm,
      },
    ],
    history: createWebHashHistory(),
  });
}
