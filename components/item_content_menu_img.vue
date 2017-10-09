<template>
  <div class="item-content_menu-imgs"> 
    <li v-for="image in images">
      <label class="item-content_menu-img-label" :for="`item-content_menu-img-${image.name}`">
        <input class="item-content_menu-img-radio" 
          v-model="picked" type="radio" :value="image.name"
          :name="name"
          :id="`item-content_menu-img-${image.name}`"
        >
        <img class="item-content_menu-img" :src="image.url" :id="`item-content_menu-img-${image.name}`">
      </label>
    </li>
  </div>
</template>>

<script>
export default {
  props: ["value", "name", "images"],
  watch: {
    picked(val){
      this.$emit('input', this.picked);
    }
  },
  data() {
    return {
      picked: ""
    }
  }
}
</script>>

<style>
.item-content_menu-imgs {
  display: grid;
  justify-content: space-between;
  grid-template-columns: 40px 40px 40px 40px;
}

.item-content_menu-img-label:hover {
  opacity: .9;
}

.item-content_menu-img-radio {
  display: none;
}

.item-content_menu-img-radio:checked ~ .item-content_menu-img {
  opacity: 1;
}

.item-content_menu-img {
  -webkit-user-drag:none;
  -khtml-user-drag:none;
  width: 40px;
  height: 40px;
  opacity: .6;
}
</style>
