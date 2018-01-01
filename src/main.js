// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import Toasted from 'vue-toasted';
import 'vue-awesome/icons/minus-circle';
import Icon from 'vue-awesome/components/Icon';
import Buefy from 'buefy';
import 'buefy/lib/buefy.css';
import VueTyperPlugin from 'vue-typer'


Vue.config.productionTip = false
Vue.use(require('vue-moment'));
Vue.use(Toasted);
Vue.use(Buefy);
Vue.use(VueTyperPlugin)


// Vue.toasted.register('login_error', 'Wrong email or password', {
//   type : 'error',
//   icon : 'check'
// })



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
