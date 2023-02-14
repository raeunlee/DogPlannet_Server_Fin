async function selectDb(connection) {
    const sql = "select * from Users";
    const [dbRows] = await connection.query(sql);
    return dbRows;
  }

  module.exports = {
    selectDb
  }