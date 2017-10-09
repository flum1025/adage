<template>
  <div class="item-content_menu-lists">
    <li class="item-content_menu-list-li" v-for="element in items">
      <label class="item-content_menu-list-label" :for="`item-content_menu-list-${element.value}`">
        <input class="item-content_menu-list-radio" 
          v-model="picked" type="radio" :value="element.value"
          :name="name"
          :id="`item-content_menu-list-${element.value}`"
        >
        <div class="item-content_menu-list-color">
          <span class="item-content_menu-list" :id="`item-content_menu-list-${element.value}`"><slot>{{element.label}}</slot></span>
        </div>
      </label>
    </li>
  </div>
</template>

<script>
export default {
  props: ["value", "name", "elements"],
  methods: {
    convert(val) {
      return val.map(function(x){
        if (typeof(x) == "string"){
          return {label: x, value: x};
        }else{
          return x;
        }
      });
    }
  },
  mounted(){
    this.items = this.convert(this.elements);
  },
  watch: {
    picked(val){
      this.$emit('input', this.picked);
    },
    elements(val){
      this.items = this.convert(val);
    }
  },
  data(){
    return {
      items: [],
      picked: ""
    }
  }
}
</script>

<style>
.item-content_menu-list-li {
  position: relative;
  height: 26px;
  line-height: 26px;
  margin-left: -10px;
  margin-right: -10px;
}

.item-content_menu-list-label {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.item-content_menu-list-radio {
  display: none;
}

.item-content_menu-list-color {
  color: #CAC4C9;
}

.item-content_menu-list-color a{
  color: #CAC4C9;
}

.item-content_menu-list-color:hover {
  background-color: #3e313c;
}

.item-content_menu-list {
  padding-left: 20px;
}

.item-content_menu-list-radio:checked ~ .item-content_menu-list-color {
  background-color: #4c9689;
  color: #fff;
}
</style>
