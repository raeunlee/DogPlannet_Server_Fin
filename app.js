const models = require("./models/index.js");
const config = require('./config/config.json');
const mysql = require('mysql2');


// var mysql = require('mysql2');

var connection = mysql.createConnection({
    host     : config.development.host,
    user     : config.development.username,
    password : config.development.password,
    database     : config.development.database
  });

models.sequelize.sync().then( () => {
    console.log(" DB 연결 성공");
}).catch(err => {
    console.log("연결 실패");
    console.log(err);
})