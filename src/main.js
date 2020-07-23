import Vue from 'vue';
import VueRouter from "vue-router";
import App from './App.vue';
import store from "./store";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Pokedex from "@/components/Pokedex.vue";
import Party from "@/components/Party.vue";

Vue.use(VueRouter);
Vue.use(VueSweetalert2);

Vue.config.productionTip = false;

// initilise router with our two pages
const router = new VueRouter({
  mode: "history",
  base: __dirname,
  routes: [
    { path: "/", component: Pokedex },
    { path: "/party", component: Party }
  ]
});

// initilise app
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
