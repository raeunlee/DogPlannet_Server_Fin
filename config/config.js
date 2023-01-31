module.exports = {
  "development": {
    username: "root",
    password: "Gusdn4772!",
    database: "dogplannet",
    host: "dogplannetdb.cn32ewkhaqwz.ap-northeast-2.rds.amazonaws.com",
    dialect: "mysql",
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci"
  },

  "test": {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },

  "production": {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql"
  }
}
