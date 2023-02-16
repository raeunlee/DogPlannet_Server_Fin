async function selectDb(connection) {
  const sql = "select * from Users";
  const [dbRows] = await connection.query(sql);
  return dbRows;
}

async function createDb(connection,postCommentParam) {

  const sql = `
  INSERT INTO replies(post_id,writer,content)
  VALUES (?,?, ?);
`;
  const [dbRows] = await connection.query(sql,postCommentParam);
  return dbRows;
}

module.exports = {
  selectDb,
  createDb
}