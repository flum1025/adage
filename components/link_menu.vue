<template>
  <div class="menu-icon">
    <el-popover
       popper-class="link-menu-button"
       width="250"
       placement="bottom-end"
       trigger="click">
      <div class="menu">
        <h2 id="link-menu-title">Admin Pages</h2>
        <nav>
          <ul id="link-menu-links">
            <li v-for="menu in link_menus">
              <i :class="`fa ${menu.icon}`" aria-hidden="true"></i>
              <a :href="menu.url" target="_blank">{{menu.name}}</a>
            </li>
            <li v-for="route in routes">
              <i :class="`fa fa-file-text`" aria-hidden="true"></i>
              <router-link :to="route.path">{{route.name || route.path}}</router-link>
            </li>
            <li id="link-menu-sign-out" @click="logout" v-if="$root.auth.loggedIn">
              <i class="fa fa-sign-out" aria-hidden="true"></i>
              <router-link to="/">Sign out</router-link>
            </li>
          </ul>
        </nav>
      </div>

      <span class="fa-square-4" slot="reference">
        <i class="fa fa-square-o fa-small" aria-hidden="true"></i>
        <i class="fa fa-square-o fa-small" aria-hidden="true"></i>
        <i class="fa fa-square-o fa-small" aria-hidden="true"></i>
        <i class="fa fa-square-o fa-small" aria-hidden="true"></i>
      </span>
    </el-popover>
  </div>
</template>

<script>
var axios = require('axios');

export default {
  methods: {
    logout(){
      var self = this;
      var currentUrl = self.$route.path;
      axios.delete("/api/authenticate").then(function(response){
        self.$root.auth.logout();
        self.$router.push({ path: 'login', query: { redirect: currentUrl }});
      });
    }
  },
  data() {
    return {
      link_menus: require('../config/links.json'),
      routes: require('../config/routes.js').default
    }
  }
}
</script>

<style>
.link-menu-button {
  border: 0;
  background-color: #362233;
}

.el-popover[x-placement^=bottom].link-menu-button .popper__arrow {
  border-bottom-color: #362233;
}
.el-popover[x-placement^=bottom].link-menu-button .popper__arrow::after {
  border-bottom-color: #362233;
}

.menu {
  color: rgba(255,255,255,0.5);
}

#link-menu-title {
  margin-top: 0;
  padding-bottom: 10px;
  color: #ffffff;
  border-bottom: 1px solid rgba(255,255,255,0.5);
}

#link-menu-links li{
  margin-bottom: 5px;
}

#link-menu-links a{
  font-size: medium;
  color: rgba(255,255,255,0.5)
}

#link-menu-links i{
  font-size: 135%;
  margin-right: 7px;
}

#link-menu-sign-out {
  margin-top: 20px;
  padding-top: 10px;
  border-top: 1px solid rgba(255,255,255,0.5);
}
</style>
