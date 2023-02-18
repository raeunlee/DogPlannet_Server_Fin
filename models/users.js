
const { pool } = require("../config/database");
 
// 모든 유저 조회
async function selectUser(connection) {
  const selectUserListQuery = `
                  SELECT email, name 
                  FROM Users;
                  `;
  const [userRows] = await connection.query(selectUserListQuery);
  console.log(userRows);
  return userRows;
  }
  
  // 이메일로 회원 조회
  async function selectUserEmail(connection, email) {
    const selectUserEmailQuery = `
                    SELECT email, name
                    FROM Users 
                    WHERE email = ?;
                    `;
    const [emailRows] = await connection.query(selectUserEmailQuery, email);
    return emailRows;
  }
  
  // userId 회원 조회
async function selectUserId(connection, userId) {
  const selectUserIdQuery = `
                  SELECT id, email, name
                  FROM Users
                  WHERE id = ?;
                  `;
  const [userRow] = await connection.query(selectUserIdQuery, userId);
  console.log(userRow);
  return userRow;
  }
  
  // 유저 생성
async function insertUserInfo(connection, insertUserInfoParams) {
  const insertUserInfoQuery = `
          INSERT INTO Users(email,password,name)
          VALUES (?, ?, ?);
      `;
  const insertUserInfoRow = await connection.query(
      insertUserInfoQuery,
      insertUserInfoParams
  );
  
  return insertUserInfoRow;
  }
  
  // 패스워드 체크
async function selectUserPassword(connection, selectUserPasswordParams) {
  const selectUserPasswordQuery = `
          SELECT email, name, password
          FROM Users
          WHERE email = ? AND password = ?;`;
  const selectUserPasswordRow = await connection.query(
      selectUserPasswordQuery,
      selectUserPasswordParams
  );
  
  return selectUserPasswordRow;
  }
  
  // 유저 계정 상태 체크 (jwt 생성 위해 id 값도 가져온다.)
async function selectUserAccount(connection, email) {
  const selectUserAccountQuery = `
          SELECT status, id
          FROM Users
          WHERE email = ?;`;
  const selectUserAccountRow = await connection.query(
      selectUserAccountQuery,
      email
  );
  return selectUserAccountRow[0];
  }
  
async function updateUserInfo(connection, id, nickname) {
  const updateUserQuery = `
  UPDATE Users
  SET name = ?
  WHERE id = ?;`;
  const updateUserRow = await connection.query(updateUserQuery, [nickname, id]);
  return updateUserRow[0];
  }



//Read
async function retrieveUserList(email) {
    if (!email) {
      const connection = await pool.getConnection(async (conn) => conn);
      const userListResult = await selectUser(connection);
      console.log(userListResult)
      connection.release();
  
      return userListResult;
    } else {
      const connection = await pool.getConnection(async (conn) => conn);
      const userResult = await selectUserId(connection, email);
      console.log(userResult)
      connection.release();
  
      return userResult;
    }
  }

async function retrieveUser(userId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const userResult = await selectUserId(connection, userId);
    console.log(userResult)
    connection.release();
  
    return userResult[0];
  }

async function emailCheck(email) {
     const connection = await pool.getConnection(async (conn) => conn);
     const emailCheckResult = await selectUserEmail(connection, email);
    connection.release();
  
    return emailCheckResult;
}
  
async function passwordCheck(selectUserPasswordParams) {
    const connection = await pool.getConnection(async (conn) => conn);
    const passwordCheckResult = await selectUserPassword(
      connection,  
      selectUserPasswordParams
    );
    connection.release();
    return passwordCheckResult;
  };
  
async function accountCheck(email) {
    const connection = await pool.getConnection(async (conn) => conn);
    const userAccountResult = await selectUserAccount(connection, email);
    connection.release();
  
    return userAccountResult;
  };
  
  
  


module.exports = {
    selectUser,
    selectUserEmail,
    selectUserId,
    insertUserInfo,
    selectUserPassword,
    selectUserAccount,
    updateUserInfo,
    retrieveUserList,
    retrieveUser,
    emailCheck,
    passwordCheck,
    accountCheck
}
