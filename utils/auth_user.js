let readlineSync = require('readline-sync'),
  fs = require("fs"),
  hash = require("../utils/hash.js");

var path = require('path');
const authFile = path.resolve(process.argv[2]);

function save(id, password){
  let auth = require(authFile);
  auth.push({id: id, password: password});
  fs.writeFileSync(authFile, JSON.stringify(auth, null , "  "));
}

let user = readlineSync.question('User name: ');
let pass1 = readlineSync.question('New password: ', {hideEchoBack: true});
let pass2 = readlineSync.question('Retype new password: ', {hideEchoBack: true});

if (user.length <= 0){
  console.log('Sorry, user name required');
  process.exit(1);
};

if (pass1.length <= 0){
  console.log('Sorry, password required');
  process.exit(1);
};

if (pass1 !== pass2) {
  console.log('Sorry, passwords do not match');
  process.exit(1);
};

save(user, hash.create(pass1));
console.log('Output to', authFile);
