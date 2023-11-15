import Vue from "vue";
import VueRouter from "vue-router";
import ObservableSearch from "../views/ObservableSearch.vue";
import ObservableList from "../views/ObservableList.vue";
import EntityList from "../views/EntityList.vue";
import EntityDetails from "../views/EntityDetails.vue";
import IndicatorList from "../views/IndicatorList.vue";
import IndicatorDetails from "../views/IndicatorDetails.vue";
import ObservableDetails from "../views/ObservableDetails.vue";
import TaskList from "../views/TaskList.vue";
import AnalyticsList from "../views/AnalyticsList.vue";
import ExportList from "../views/ExportList.vue";
import TemplateList from "../views/TemplateList.vue";
import UserProfile from "../views/UserProfile.vue";
import UserAdmin from "../views/UserAdmin.vue";
import GroupAdmin from "../views/GroupAdmin.vue";
import TagsAdmin from "../views/TagsAdmin.vue";
import System from "../views/System.vue";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "ObservableSearch",
    component: ObservableSearch
  },
  {
    path: "/browse",
    name: "ObservableList",
    component: ObservableList,
    props: route => {
      return {
        searchQuery: route.query.q
      };
    }
  },
  {
    path: "/observable/:id([0-9]+)",
    name: "ObservableDetails",
    component: ObservableDetails,
    props: true
  },
  {
    path: "/entities",
    name: "EntityList",
    component: EntityList,
    props: route => {
      return {
        searchQuery: route.query.q
      };
    }
  },
  {
    path: "/entity/:id([0-9]+)",
    name: "EntityDetails",
    component: EntityDetails,
    props: true
  },
  {
    path: "/indicators",
    name: "IndicatorList",
    component: IndicatorList,
    props: route => {
      return {
        searchQuery: route.query.q
      };
    }
  },
  {
    path: "/indicator/:id([0-9]+)",
    name: "IndicatorDetails",
    component: IndicatorDetails,
    props: true
  },
  {
    path: "/feeds",
    name: "Feeds",
    component: TaskList,
    props: { taskType: "feed" }
  },
  {
    path: "/analytics",
    name: "Analytics",
    component: AnalyticsList
  },
  {
    path: "/exports",
    name: "Exports",
    component: ExportList
  },
  {
    path: "/templates",
    name: "Templates",
    component: TemplateList
  },
  {
    path: "/profile/:id([0-9]+)",
    name: "UserProfileAdmin",
    component: UserProfile,
    props: true
  },
  {
    path: "/profile",
    name: "UserProfile",
    component: UserProfile
  },
  {
    path: "/admin/users",
    name: "UserAdmin",
    component: UserAdmin
  },
  {
    path: "/admin/groups",
    name: "GroupAdmin",
    component: GroupAdmin
  },
  {
    path: "/admin/tags",
    name: "TagsAdmin",
    component: TagsAdmin
  },
  {
    path: "/admin/system",
    name: "SystemView",
    component: System
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  linkActiveClass: "is-active",
  routes
});

import store from "@/store";
router.beforeEach((to, from, next) => {
  if (to.name == "Login") {
    next();
  } else if (store.state.user === null) {
    store
      .dispatch("refresh")
      .then(() => {
        console.log("Refreshed and redirecting to " + to.fullPath);
        next({ path: to.fullPath });
      })
      .catch(error => {
        console.log(error);
        console.log("Not authed; redirecting to Login");
        next({ name: "Login" });
      });
  } else {
    next();
  }
});

export default router;
