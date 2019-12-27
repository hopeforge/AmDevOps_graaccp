import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router';
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import CadParceiras from './components/CadastroParceiras.vue'
import CadCupons from './components/CadastroCupons.vue'
import Email from './components/Email.vue'
import DownloadPage from './components/DownloadPage.vue'

const dotenv = require("dotenv");

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

dotenv.config();

Vue.config.productionTip = false

Vue.use(BootstrapVue);
Vue.use(VueRouter);

// Partials
import navBar from "./components/partials/navBarv.vue";


Vue.component('navBar', navBar)

//router
const routers = [
  { path: '/', component: DownloadPage, params: { side: 'nao' }},
  { path: '/login', component: Login, params: { side: 'nao' }},
  { path: '/home', component: Home, params: { side: 'sim' }},
  { path: '/parceiras', component: CadParceiras, params: { side: 'sim' }},
  { path: '/cupons', component: CadCupons, params: { side: 'sim' }},
  { path: '/email', component: Email, params: { side: 'sim' }}
];

const router = new VueRouter({
  routes: routers,
  mode: 'history'  
})

new Vue({
  el: '#app',
  router : router,
  render: h => h(App)
})