import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import VueRouter from "vue-router";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import Vuex from "vuex";

import { store } from "./store";
import Home from "./components/Home.vue";
import DataEntry from "./components/DataEntry.vue";
import EstimateAccuracy from "./components/EstimateAccuracy.vue";
import ReleaseNote from "./components/ReleaseNote.vue";
import SprintEstimate from "./components/SprintEstimate.vue";
import VueClipboard from "vue-clipboard2";

Vue.config.productionTip = false;

const routes = [
  { path: "/", component: Home },
  { path: "/dataEntry", component: DataEntry },
  { path: "/estimateAccuracy", component: EstimateAccuracy },
  { path: "/releaseNote", component: ReleaseNote },
  { path: "/sprintEstimate", component: SprintEstimate },
];

const router = new VueRouter({
  routes,
});

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(VueClipboard);

new Vue({
  render: (h) => h(App),
  store,
  router,
}).$mount("#app");
