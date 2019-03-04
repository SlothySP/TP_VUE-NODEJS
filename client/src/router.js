import Vue from "vue";
import Router from "vue-router";
import Home from "./components/Home";
import EventPage from "./components/EventPage";
import EventAdd from "./components/EventAdd";

Vue.use(Router);

export default new Router({
  routes: [
    {
      name: "homePage",
      component: Home,
      path: "/"
    },
    {
      name: "eventAdd",
      component: EventAdd,
      path: "/event/add"
    },
    {
      name: "eventPage",
      component: EventPage,
      path: "/event/:id"
    }
  ]
});
