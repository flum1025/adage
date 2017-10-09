var express = require('express'),
  router = express.Router();

router.get("/demo/talk", function(req, res, next){
  if (req.requireAuth(res)){ //require auth
    res.json([
      {
        me: true,
        name: "noah",
        message: 'こんにちは'
      },
      {
        me: false,
        name: "yua",
        message: 'こんにちは'
      }
    ])
  }
});

module.exports = router;
