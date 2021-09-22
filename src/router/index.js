import { createRouter, createWebHistory } from "vue-router";
import CoachList from "../views/CoachList.vue";
import LoadDetails from "../views/LoadDetails.vue";
import ContactCoach from "../views/ContactCoach.vue";
import CoachRegisteration from "../views/CoachRegisteration.vue";
import RequestsRecived from "../views/RequestsRecived.vue";
import NotFound from "../views/NotFound.vue";
import UserAuth from "../views/UserAuth.vue";
import store from "../store/index.js";
const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/coaches",
  },
  {
    path: "/coaches",
    name: "coaches",
    component: CoachList,
  },
  {
    path: "/coach/:id",
    name: "coach",
    component: LoadDetails,
    props: true,
    children: [
      {
        path: "contact",
        name: "contact",
        component: ContactCoach,
      },
    ],
  },
  {
    path: "/register",
    name: "register",
    component: CoachRegisteration,
    meta: { requiresAuth: true },
  },
  {},
  {
    path: "/requests",
    name: "requests",
    component: RequestsRecived,
    meta: { requiresAuth: true },
  },
  {
    path: "/auth",
    name: "auth",
    component: UserAuth,
    meta: { requiresUnAuth: true },
  },
  {
    path: "/:notFound(.*)",
    name: "notFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next("/auth");
  } else if (to.meta.requiresUnAuth && store.getters.isAuthenticated) {
    next("/coaches");
  } else {
    next();
  }
});
export default router;
