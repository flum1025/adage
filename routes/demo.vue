<template>
  <app>
    <item_header slot="item_header" title="Sarasty" subtitle="#Conversation"></item_header>

    <template slot="item_content">
      <item_content_menu_content title="Providers">
        <item_content_menu_img name="providers" :images="providers" v-model="provider"></item_content_menu_img>
      </item_content_menu_content>

      <item_content_menu_content :title="menu_content_title" v-loading.body="item_loading" element-loading-text="Loading...">
        <item_content_menu_list_with_refine name="users" :elements="users" v-model="user"></item_content_menu_list_with_refine>
      </item_content_menu_content>
    </template>

    <content_header slot="content_header" v-if="sister === '' && provider === ''" title="None">
      <li slot="list">Please select a content from the left pane.</li>
    </content_header>

    <content_header slot="content_header" v-else :title="!selectedUserName() ? 'None' : selectedUserName().label">
      <li slot="list">{{provider}}</li>
      <li slot="list" v-if="messages.length > 0">{{messages.length}} Messages</li>
    </content_header>

    <ul slot="content_body" class="message-list" v-loading.body="content_loading" element-loading-text="Loading...">
      <balloon :position="message.position" v-for="message in messages" :data="message"></balloon>
      <input class="scroll-dummy-input" type="text">
    </ul>
  </app>
</template>

<script>
var axios = require('axios');

export default {
  methods: {
    callApi(url){
      console.log(url);
      var self = this;
      return axios.get(url).catch(function(err){
        console.log(err);
        self.$message.error(err.message);
        self.content_loading = false;
        self.item_loading = false;
      });
    },
    selectedUserName(){
      return this.users.find(e=>e.value===this.user);
    }
  },
  watch: {
    provider(name) {
      this.item_loading = true;
      this.users = [];
      var self = this;
      setTimeout(function() {
        for(let i=0; i<10; i++){
          let n = `${name} user ${i}`;
          self.users.push({label: n, value: n});
        }
        self.item_loading = false;
      }, 1000);
    },
    user(user_id) {
      this.content_loading = true;
      this.messages = [];
      var url = `/api/demo/talk`;
      var self = this;
      setTimeout(function() {
        self.callApi(url).then(function(response){
          console.log(`message size is ${response.data.length}`);
          for(let message of response.data) {
            if(!message.me) {
              self.messages.push({position: 'left', name: message.name, icon: "/image/demo/sarasty_yua.jpg", text: message.message});
            }else{
              self.messages.push({position: 'right', name: message.name, icon: "/image/demo/sarasty_noah.jpg", text: message.message});
            }
          }
          self.content_loading = false;
          setTimeout(function() {
            let el = self.$el.getElementsByClassName("scroll-dummy-input")[0];
            el.style.display = 'inline';
            el.blur();
            el.focus();
            el.style.display = 'none';
          }, 100);
        })
      }, 1000);
    }
  },
  data() {
    return {
      item_loading: false,
      content_loading: false,
      providers: [
        {name: "twitter", url: "/image/demo/twitter.png"},
        {name: "line", url: "/image/demo/line.png"}
      ],
      menu_content_title: "Users",
      users: [],
      messages: [],
      provider: "",
      user: ""
    }
  }
}
</script>

<style>
.el-loading-mask {
  background-color: initial !important;;
}

.scroll-dummy-input {
  width: 0;
  height: 0;
  display: none;
}
</style>
