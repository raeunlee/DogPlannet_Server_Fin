const mysql = require('mysql2/promise');
const {logger} = require('./winston');

// TODO: 본인의 DB 계정 입력

const pool = mysql.createPool({
    host: 'dogplannetdb.cn32ewkhaqwz.ap-northeast-2.rds.amazonaws.com',
    user: 'root',
    port: '3306',
    password: 'Gusdn4722!',
    database: 'dogplannet'
});

/*
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Gusdn4722!',
    database: 'dogplannet'
});
*/

module.exports = {
    pool: pool
};