import {
  createRouter as createVueRouter,
  createWebHistory, // Importar createWebHistory en lugar de createWebHashHistory
  Router,
  RouteRecordRaw,
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
import SolicitudeView from "../views/SolicitudeView.vue";

// Define las rutas como RouteRecordRaw para un tipado fuerte
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
  },
  {
    path: "/calendarView",
    name: "calendarView",
    component: CalendarView,
  },
  {
    path: "/spaceForm",
    name: "spaceForm",
    component: SpaceForm,
  },
  {
    path: "/subjectForm",
    name: "subjectForm",
    component: SubjectForm,
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
  {
    path: "/solicitudeView",
    name: "solicitudeView",
    component: SolicitudeView,
  }
  // ... aquí irían el resto de tus rutas
];

export function createRouter(app: App): Router {
  return createVueRouter({
    history: createWebHistory(), // Cambiado a createWebHistory para usar el modo history
    routes, // Rutas definidas arriba
  });
}
