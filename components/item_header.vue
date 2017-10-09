<template>
  <div class="item-header">
    <div class="item-header-text">
      <h1 class="item-header-title"><router-link to="/">{{title}}</router-link></h1>
      <h2 class="item-header-subtitle">{{subtitle}}</h2>
    </div>
    <link_menu></link_menu>
  </div>
</template>

<script>
export default {
  components: {
    link_menu: require('./link_menu.vue')
  },
  props: ['title', 'subtitle'],
  methods: {
  },
  data() {
    return {
    }
  }
}
</script>

<style>
.item-header {
  display: table;
  width: 100%;
  padding-left: 5px;
  margin-bottom: 30px;
}

.item-header-text {
  display:table-cell;
}

.item-header-title {
  font-size: large;
  margin: 0;
  text-align: left;
}

.item-header-subtitle {
  font-size: small;
  font-weight: normal;
  margin: 0;
  text-align: left;
  color: #AB9BA9;
}

.menu-icon {
  display:table-cell;
  vertical-align: top;
  position: relative;
  text-align: right;
  width: 10%;
}

.fa-square-4 {
  display: grid;
  grid-template-rows: 10px 10px;
  grid-template-columns: 10px 10px;
}

.fa-small {
  font-size: 0.5em;
}
</style>
