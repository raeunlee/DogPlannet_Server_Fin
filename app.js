const models = require("./models/index.js");
const config = require('./config/config.js');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : config.development.host,
    user     : config.development.username,
    password : config.development.password,
    database : config.development.database
  });

  models.sequelize.sync().then(() => {

    doginfos.create({
         dogtype: ["비숑","닥스훈트","믹스견","말티즈","포메라니안","푸들","스피치"],
         dog_sex: ["암컷","수컷"]
       }).then(doginfos => {
         console.log(doginfos.dog_sex)
         console.log(doginfos.dogtype)
       });
 
     dogrecords.create({
         poop_type: ["정상","변비","설사"]
       }).then(dogrecords => {
         console.log(dogrecords.poop_type)
       });
     console.log(" DB 연결 성공");
 }).catch(err => {
   console.log("연결 실패");
   console.log(err);
 })