async function selectDb(connection) {
  const sql = "select * from Users";
  const [dbRows] = await connection.query(sql);
  return dbRows;
}

async function createDb(connection,postCommentParam) {
  // post_id,dog_name, content,user_id
  const sql = `
  INSERT INTO replies(post_id,dog_name,content,user_id)
  VALUES (?,?,?,?);
`;
  const [dbRows] = await connection.query(sql,postCommentParam);
  return dbRows;
}

async function findUserComment(connection,user_id) {
  // user_id
  const sql = `
  SELECT dog_name, content, createdAt
  FROM replies
  WHERE user_id = '?';
  `;
  const [dbRows] = await connection.query(sql,user_id);
  console.log(dbRows)
  return dbRows;
}

module.exports = {
  selectDb,
  createDb,
  findUserComment
}