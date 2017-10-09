var Vue       = require('vue'),
  VueRouter   = require('vue-router'),
  ElementUI   = require('element-ui'),
  axios       = require('axios'),
  locale      = require('element-ui/lib/locale/lang/ja');

import VModal from 'vue-js-modal'
import VueImg from 'v-img';
Vue.use(VueImg);
Vue.use(VModal);

Vue.use(ElementUI, {locale});
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: require('../../config/routes.js').default
});

var Auth = {
  loggedIn: false,
  login(){this.loggedIn = true},
  logout(){this.loggedIn = false},
};

router.beforeEach((to, from, next) => {
  axios.get('/api/authenticate').then(function(response){
    if (to.matched.some(record => record.meta.login) && !response.data.login) {
      next({ path: '/login', query: { redirect: to.fullPath }});
    } else {
      next();
    }
  }).catch(function(err){
    if (to.matched.some(record => record.meta.login)) {
      next({ path: '/login', query: { redirect: to.fullPath }});
    } else {
      next();
    }
  });
});

Vue.component('app', require('../../components/app.vue'))
Vue.component('item_header', require('../../components/item_header.vue'))
Vue.component('item_content_menu_content', require('../../components/item_content_menu_content.vue'))
Vue.component('item_content_menu_img', require('../../components/item_content_menu_img.vue'))
Vue.component('item_content_menu_list', require('../../components/item_content_menu_list.vue'))
Vue.component('item_content_menu_list_with_refine', require('../../components/item_content_menu_list_with_refine.vue'))
Vue.component('content_header', require('../../components/content_header.vue'))
Vue.component('balloon', require('../../components/balloon.vue'))

var app = new Vue({
  data() {
    return {
      auth: Auth
    }
  },
  router
}).$mount('#app');
