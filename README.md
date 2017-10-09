# Adage

Easy to create responsive Single Page Application admin page with Vue.js.

[LIVE DEMO](demo.adage.flum.pw)(user: test, password: test)

## Usage

Clone and Installation of dependent package.

    $ git clone https://github.com/flum1025/adage.git
    $ npm install

### Create New Page

You can place a .vue file in `routes/` and create a page with the default design by following the specifications below.

```html
<template>
  <app>
    <item_header slot="item_header" title="Page" subtitle="#TestPage"></item_header>

    <template slot="item_content">
      <item_content_menu_content title="menu">
      </item_content_menu_content>
    </template>

    <content_header slot="content_header" v-else :title="Page">
      <li slot="list">Additional info</li>
    </content_header>

    <ul slot="content_body" class="message-list" v-loading.body="content_loading" element-loading-text="Loading...">
    </ul>
  </app>
</template>

<script></script>
<style></style>
```

#### menu

The following components can be used for the menu type.

- `<item_content_menu_img>`
- `<item_content_menu_list>`
- `<item_content_menu_list_with_refine>`(List with search function)

#### main content

You can use components of [Element-UI](https://github.com/ElemeFE/element) and LINE-like balloon component(`<baloon>`).

### Routing

After creating the page you need to add routing. Routing is described `config/routes.js`
You can add login authentication by adding `meta: { login: true }` to the elements of the page

### Login

To use login authentication, you need to add users with the following command.

    $ npm run useradd

Password is hashed and stored in `config/auth.json`.

### API

Add files to `apis/` you can create web api for use on the page. Web api in `apis/` folder automatically `/api` namespace. 
You can add authentication by enclosing it with `if (req.requireAuth(res)){}`. Error message is returned automatically

```js
var express = require('express'),
  router = express.Router();
  
router.get("/test", function(req, res, next){ // /api/test
  res.json()
});

router.get("/test_with_auth", function(req, res, next){ // /api/test_with_auth
  if (req.requireAuth(res)){ //require auth
    res.json()
  }
});

module.exports = router;
```

### Session

Before you publish the application you have to change the session secret for security.
Change secret attribute of `config/session.json`.

### Global Links

Add links to `config/links.json` you can add global links that can be referenced from all pages.

Example,
```js
  [{
    url: "https://google.com",
    name: "Google",
    icon: "fa-search" // awesome icon
  }]
```

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/flum1025/adage. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
