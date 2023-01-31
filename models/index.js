'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
console.log(config)

sequelize = new Sequelize("dogplannet", "root", "Gusdn4722!", 
  {"host": "dogplannetdb.cn32ewkhaqwz.ap-northeast-2.rds.amazonaws.com",
  "dialect": "mysql"});

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

module.exports = db;
