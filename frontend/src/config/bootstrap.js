import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

import VueTheMask from 'vue-the-mask'
import money from "v-money"

import Vue from "vue"
import BootstrapVue from "bootstrap-vue"

Vue.use(BootstrapVue)
Vue.use(VueTheMask)
Vue.use(money, {precision: 2})
