<template>
  <app>
    <item_header slot="item_header" title="Admin" subtitle="#index"></item_header>

    <div slot="item_content">
      <item_content_menu_content title="Links">
        <li v-for="route in routes">
          <item_content_menu_list name="links" :elements="[1]"><router-link :to="route.path">{{route.name || route.path}}</router-link></item_content_menu_list>
        </li>
      </item_content_menu_content>
    </div>

    <content_header slot="content_header" title="Admin">
      <li slot="list">Please select a page from the left pane.</li>
    </content_header>

    <ul slot="content_body" class="message-list">
      Please select a page from the left pane.
    </ul>
  </app>
</template>

<script>
export default {
  data() {
    return {
      routes: require('../config/routes.js').default
    }
  }
}
</script>

<style>
.message-list {
  color: #000;
}
</style>
