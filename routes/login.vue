<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">Log In</div>

      <el-form ref="form" :model="form" @keyup.enter.native="login" label-width="100px">
        <el-form-item label="User">
          <el-input v-model="user"></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input type="password" v-model="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">Log In</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
var axios = require('axios');

export default {
  data() {
    return {
      user: "",
      password: ""
    }
  },
  methods: {
    login() {
      let params = new URLSearchParams();
      params.append('id', this.user);
      params.append('password', this.password);

      var self = this;
      axios.post("/api/authenticate", params).then(function(response){
        if(response.data.success){
          self.$root.auth.login();
          self.$router.push(self.$route.query.redirect || "/");
        }
      }).catch(function(err){
        self.$message.error(err.response.data.message);
      });
    }
  }
}
</script>

<style>
body {
  background-color: #fff !important;
}

.box-card {
  width: 480px;
  margin: 0 auto;
}

@media only screen and (max-width: 767px){
  .box-card {
    width: 100%;
  }
}
</style>
