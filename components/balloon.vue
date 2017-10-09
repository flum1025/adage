<template>
  <div class="balloon">
    <div :class="`balloon-${position}`">
      <div class="balloon-icon">
        <img :src="data.icon">
      </div>
      <div class="balloon-name">{{data.name}}</div>
      <div class="balloon-area">
        <div class="balloon-content">{{data.text}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['position', 'data']
}
</script>

<style>
.balloon {
  color: #000;
  font-size: small;
  margin-bottom: 20px;
}

.balloon-left {
  display: grid;
  grid-template-rows: repeat(auto-fill, 15px);
  grid-template-columns: 40px 1fr;
  grid-template-areas:
    "icon name"
    "icon balloon"
    "icon balloon"
    ". balloon";
  text-align: left;
}

.balloon-right {
  display: grid;
  grid-template-rows: repeat(auto-fill, 15px);
  grid-template-columns: auto 40px;
  grid-template-areas:
    "name icon"
    "balloon icon"
    "balloon icon"
    "balloon .";
    text-align: right;
}

.balloon .balloon-icon {
  grid-area: icon;
  width: 40px;
}

.balloon .balloon-icon img{
  width: 100%;
  height: auto;
  border-radius: 50%;
}

.balloon .balloon-name {
  grid-area: name;
  margin-left: 5px;
  color: #747c89;
}

.balloon .balloon-area {
  margin-top: 5px;
  margin-left: 13px;
  grid-area: balloon;
}

.balloon .balloon-left .balloon-area {
  margin-left: 13px;
}

.balloon .balloon-right .balloon-area {
  margin-right: 13px;
}

.balloon .balloon-area .balloon-content {
  display: inline-block;
  position: relative;
  padding: 6px 10px 6px 12px;
  border-radius: 20px;
  text-align: left;
}

.balloon .balloon-area .balloon-content:before {
  content: "";
  display: inline-block;
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: transparent;
  border-radius: 50%;
  top: -3px;
}

.balloon .balloon-left .balloon-area .balloon-content {
  background-color: #eceef3;
}

.balloon .balloon-right .balloon-area .balloon-content {
  background-color: #bef18c;
}

.balloon .balloon-left .balloon-area .balloon-content:before {
  box-shadow: inset -2px 5px 0 1px #eceef3;
  transform: rotate(142deg);
  left: -7px;
}

.balloon .balloon-right .balloon-area .balloon-content:before {
  box-shadow: inset -2px 5px 0 1px #bef18c;
  transform: rotate(173deg);
  right: -7px;
}
</style>
