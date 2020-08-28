import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import VueGeolocation from "vue-browser-geolocation";

Vue.config.productionTip = false;
Vue.use(VueGeolocation);

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
