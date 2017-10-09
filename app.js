require('dotenv').config();
var fs = require("fs"),
  express = require("express"),
  morgan = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  app = express();

// Logger
if (app.get('env') == 'production') {
  var fs = require('fs');
  var stream = fs.createWriteStream(__dirname + '/log.txt', { flags: 'a' });
  app.use(morgan({ format: 'common', stream: stream }));
} else {
  app.use(morgan('common'));
}

// Static files
if (app.get('env') !== 'production') {
  app.use(express.static('assets'))
}
app.use(express.static('public'));

// Views
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var server = app.listen(3000, function(){
  console.log("Node.js is listening to PORT:" + server.address().port);
});

// Cookie & Session
app.use(cookieParser());
app.use(session(require('./config/session.json')));

// Post
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Login
app.use(function (req, res, next) {
  req.isLogin = !req.session.user ? false : true;
  req.authFailed = function(res){
    res.status(401).json({
      authentication: false,
      message: "Authentication is required"
    });
  }
  req.requireAuth = function(res){
    if (!req.isLogin){
      req.authFailed(res)
    }
    return req.isLogin;
  }
  next();
});

var auth = require('./config/auth.json'),
  hash = require('./utils/hash.js');
app.post("/api/authenticate", function(req, res, next){
  user = auth.find(e=>e.id===req.body.id && e.password===hash.create(req.body.password));
  if(user){
    req.session.user = {name: user.id};
    res.json({
      success: true,
      message: 'Authentication successfully finished.',
      user: user.id
    });
  }else{
    res.status(401).json({
      success: false,
      message: 'Authentication failed. User not found.'
    })
  }
});
app.get("/api/authenticate", function(req, res, next){
  res.json({
    login: !req.session.user ? false : true
  })
});
app.delete("/api/authenticate", function(req, res, next){
  delete req.session.user;
  res.json({
    login: false
  })
});


// Router
app.disable('etag');

fs
  .readdirSync(__dirname + "/apis")
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    app.use('/api', require("./apis/" + file))
  });

app.all('/api/*', function(req, res, next){
  res.status(400).json({
    message: "Bad Request"
  })
});

app.get("/*", function(req, res, next){
  res.render('index');
});
