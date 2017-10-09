<template>
  <div class="item-content_menu-list-with-refine">
    <div class="item-content_menu-list-with-refine-search">
      <el-input placeholder="Search" size="small" v-model="input"></el-input>
    </div>
    <item_content_menu_list :name="name" :elements="filtered_elements" v-model="picked"></item_content_menu_list>
  </div>
</template>

<script>
export default {
  props: ["value", "name", "elements"],
  watch: {
    picked(val){
      this.$emit('input', this.picked);
    },
    elements(data){
      this.filtered_elements = data;
      this.input = "";
    },
    input(text){
      this.filtered_elements = this.elements.filter(e=>e.label.indexOf(text) != -1);
    }
  },
  data(){
    return {
      input: "",
      picked: "",
      filtered_elements: []
    }
  }
}
</script>

<style>
.item-content_menu-list-with-refine-search {
  margin-bottom: 10px;
}
</style>
