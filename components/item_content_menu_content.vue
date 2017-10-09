<template>
  <div class="item-content_menu-content">
    <div class="item-content_menu-title">{{title}}</div>
    <slot></slot>
  </div>
</template>>

<script>
export default {
  props: ["title"]
}
</script>>

<style>
.item-content_menu-content {
  margin-bottom: 30px;
}

.item-content_menu-title:hover {
  color: #fff;
}

.item-content_menu-title {
  color: #CAC4C9;
  margin: 0;
  margin-bottom: 10px;
}
</style>
