<template>
  <div class="header box">
    <span class="content-header-title">{{title}}</span>
    <ul class="content-header-info"><slot name="list"></slot></ul>
    <div class="content-header-menu">
      <el-popover
         popper-class="content-header-menu-button"
         placement="bottom-end"
         width="220"
         trigger="click">
        <div class="content-header-menu-content">
          <ul>
            <li v-for="menu in menus">
              <i :class="`fa ${menu.icon}`" aria-hidden="true"></i>
              <a :href="menu.url" target="_blank">{{menu.name}}</a>
            </li>
          </ul>
        </div>

        <i class="fa fa-ellipsis-v" slot="reference" aria-hidden="true"></i>
      </el-popover>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "menus"]
}
</script>

<style>
.header {
  display: table;
  width: 100%;
  text-align: left;
  height: 60px;
  padding: 7px 10px 7px 20px;
}

.content-header-title {
  font-weight: 900;
}

.content-header-info {
  display: table;
  margin-top: 5px;
  font-size: 13px;
}

.content-header-info > li {
  display: table-cell;
  padding-right: 10px;
  color: #717274;
}

.content-header-info > li:not(:first-child):before {
  content: "|";
  padding-right: 10px;
}

.content-header-menu-button {
  padding: 15px;
}

.content-header-menu-content {
  color: #717274;
  font-size: 17px;
}

.content-header-menu-content a{
  color: #717274;
}

.content-header-menu-content li{
  padding-top: 3px;
  padding-bottom: 3px;
}

.content-header-menu {
  display: table-cell;
  vertical-align: middle;
  color: #717274;
  font-size: 20px;
  text-align: right;
}

.content-header-menu .fa-ellipsis-v {
  width: 20px;
  text-align: center;
}
</style>
