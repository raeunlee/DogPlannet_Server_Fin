'use strict';

const fs = require('fs');
const path = require('path');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};
const { Sequelize, DataTypes } = require('sequelize');
const dogrecords = require("./dogrecords.js");
const doginfos = require("./doginfos.js");
const models = require("../models/index.js");
const users = require('./users');
const mysql = require('mysql');

let sequelize;
console.log(config)

sequelize = new Sequelize("dogplannet", "root", "Gusdn4722!", 
  {"host": "dogplannetdb.cn32ewkhaqwz.ap-northeast-2.rds.amazonaws.com",
  "dialect": "mysql"});

  /*
const connection = mysql.createConnection({
    host     : config.development.host,
    user     : config.development.username,
    password : config.development.password,
    database : config.development.database
  });
*/

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.users = require('./users')(sequelize, Sequelize);
db.doginfos = require('./doginfos')(sequelize, Sequelize);
db.dogrecords = require('./dogrecords')(sequelize, Sequelize);
db.posts = require('./posts')(sequelize, Sequelize);
db.replies = require('./replies')(sequelize, Sequelize);

//associations
db.users.hasMany(db.doginfos, {as: "doginfos"});
db.doginfos.belongsTo(db.users, {
  foreignKey: "user_id",
  as: "user"
});

db.users.hasMany(db.dogrecords, {as: "dogrecords"});
db.dogrecords.belongsTo(db.users, {
  foreignKey: "user_id",
  as: "user"
});

db.users.hasMany(db.posts, {as: "posts"});
db.posts.belongsTo(db.users, {
  foreignKey: "user_id",
  as: "user"
});

db.posts.hasMany(db.replies, {as: "replies"});
db.replies.belongsTo(db.posts, {
  foreignKey: "post_id",
  as: "post"
});

//array 연동

module.exports = db;
