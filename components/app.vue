<template>
  <div class="app-layout" v-on:touchmove="touchmove" v-on:touchstart="touchstart" v-on:touchend="touchend">
    <input id="open" type="checkbox" v-model="checked">
    <div class="items box">
      <slot name="item_header"></slot>

      <div class="menu-content">
        <slot name="item_content"></slot>
      </div>
    </div>
    <slot name="content_header"></slot>
    <div class="contents box">
      <slot name="content_body"></slot>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    getPosition(e){
      return e.touches[0].pageX;
    },
    touchstart(e){
      if (this.checked) {
        if (this.getPosition(e) > 220){
          this.checked = false;
        }
      }else{
        this.touch = {x: this.getPosition(e)};
      }
    },
    touchend(){
      this.touch = {}
    },
    touchmove(e){
      if (this.touch.x < 10 && this.getPosition(e) - this.touch.x > 50){
        this.checked = true;
      }
    }
  },
  data() {
    return {
      touch: {},
      checked: false,
    }
  }
}
</script>

<style>
@import url("//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");
@import url("//cdnjs.cloudflare.com/ajax/libs/element-ui/1.4.4/theme-default/index.css");

*,:after,:before {
  box-sizing:border-box;
}

html, body {
  overflow: hidden;
}

body {
  position:fixed;
  width:100%;
  height:100%;
  font-family:Arial;
  background-color:#f2f2f2;
  margin:0;
}

.box {
  color:#fff;
  text-align:center;
  padding:1em;
}

input {
  width:100%;
  outline:0;
  border:1px solid #f2f2f2;
  padding:1em;
}

.message-list {
  margin:0;
  padding:0;
}

.message-list li {
  margin-top:1em;
  margin-bottom:1em;
  background-color:#f2f2f2;
  padding:.2em;
}

.app-layout {
  display:grid;
  height:100vh;
  grid-template-columns:220px 1fr;
  grid-template-rows:auto 1fr auto;
}

.header     { background-color: #ffffff; }
.items   { background-color: #52364E; }
.contents   { background-color: #ffffff; }
.write      { background-color: #f2f2f2; }

.items {
  grid-column: 1;
  grid-row: 1 / 4;
  padding: 10px;
}

.header {
  grid-column: 2;
  grid-row: 1;
  color: #333;
  border-bottom: 1px solid #f2f2f2;
}

.contents {
  grid-column: 2;
  grid-row: 2;
  padding: 0 1em;
  overflow-y: scroll;
}

  @media only screen and (max-width: 767px){
    .app-layout {
      grid-template-columns:1fr;
    }
    .items {
      grid-column: initial;
      grid-row: initial;
    }
    .header {
      grid-column: 1;
    }
    .contents {
      grid-column: 1;
    }
  }

  ul {
    margin: 0;
    padding-left: 0;
  }

  li {
    list-style: none;
  }

  a {
    text-decoration: none;
    color: #fff;
  }

  .items {
    text-align: left;
    height: 100%;
  }

  /* toggle*/

  @media only screen and (max-width: 767px){
    .items {
      position: fixed;
      top: 0;
      left: -340px; /* メニューのwidth + padding */
      width: 220px; /* メニューのwidth */
      height: 100%;
      transition: left .5s, right .5s; /* アニメーション */
      z-index: 10;
    }

    .item-toggle {
      display: inline;
    }

    /* :checked 擬似クラスを使って、#openがチェック状態になった時に、#menuが「right: 0;」になります。 */
    #open:checked + .items {
      left: 0;
    }
  }

  #open {
    display: none;
  }

.menu-content {
  height: 93.5%;
  overflow-y: scroll;
  overflow-x: hidden;
}

.menu-content::-webkit-scrollbar {
  display: none;
}

.contents {
  padding: 5px;
  background-color: #fff;
}
</style>
