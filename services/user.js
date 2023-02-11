const {logger} = require("../config/winston");
const {development} = require("../config/config")
const userModel = require('../models/users');
const baseResponse = require("../config/baseResponseStatus")
const secret_config = require("../config/secret");
const {response} = require("../config/response");
const {errResponse} = require("../config/response");
const {connection}= require("../app")
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");

// Service: Create, Update, Delete 비즈니스 로직

// 유저 생성
exports.createUser = async function (email, password, username) {
    try {
        // 이메일 중복 확인
        const emailRows = await userModel.emailCheck(email);
        if (emailRows.length > 0)
            return errResponse(baseResponse.SIGNUP_REDUNDANT_EMAIL); 
        // crypto 모듈로 비밀번호 암호화
        const hashedPassword = await crypto
            .createHash("sha512")
            .update(password)
            .digest("hex");

        const insertUserInfoParams = [email, hashedPassword, username];

        const connection = await development.getConnection(async (conn) => conn);

        // 유저 가입시 아이디 생성
        const userIdResult = await userModel.insertUserInfo(connection, insertUserInfoParams);
        console.log(`추가된 회원 : ${userIdResult[0].insertId}`)
        connection.release();
        return response(baseResponse.SUCCESS);

        // DB 관련 에러처리
    } catch (err) {
        logger.error(`App - createUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

//로그인 - 이메일, 비번으로 가입
exports.postSignIn = async function (email, password) {
    try {
        // 이메일 여부 확인
        const emailRows = await userModel.emailCheck(email);
        if (emailRows.length < 1) return errResponse(baseResponse.SIGNIN_EMAIL_WRONG);

        const selectEmail = emailRows[0].email

        // 비밀번호 확인
        const hashedPassword = await crypto
            .createHash("sha512")
            .update(password)
            .digest("hex");

        const selectUserPasswordParams = [selectEmail, hashedPassword];
        const passwordRows = await userModel.passwordCheck(selectUserPasswordParams);

        if (passwordRows[0].password !== hashedPassword) {
            return errResponse(baseResponse.SIGNIN_PASSWORD_WRONG);
        }

        // 계정 상태 확인
        const userInfoRows = await userModel.accountCheck(email);

        if (userInfoRows[0].status === "INACTIVE") {
            return errResponse(baseResponse.SIGNIN_INACTIVE_ACCOUNT);
        } else if (userInfoRows[0].status === "DELETED") {
            return errResponse(baseResponse.SIGNIN_WITHDRAWAL_ACCOUNT);
        }

        console.log(userInfoRows[0].id) // DB의 userId(생성된)

        //토큰 생성 Service
        let token = await jwt.sign(
            {
                userEmail: userInfoRows[0].id, //이메일만 생성
            }, // 토큰의 내용(payload)
            secret_config.jwtsecret, // 비밀키
            {
                expiresIn: "365d",
                subject: "userInfo",
            } // 유효 기간 365일
        );
        
        //userId & JWT토큰
        return response(baseResponse.SUCCESS, {'userId': userInfoRows[0].id, 'jwt': token});
        
    } catch (err) {
        logger.error(`App - postSignIn Service error\n: ${err.message} \n${JSON.stringify(err)}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};


// 회원정보 수정
exports.editUser = async function (id, nickname) {
    try {
        console.log(id)
        const connection = await development.getConnection(async (conn) => conn);
        const editUserResult = await updateUserInfo(connection, id, nickname)
        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - editUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}


// READ 로직
 exports.retrieveUserList = async function (email) {
    if (!email) {
      const connection = await development.getConnection(async (conn) => conn);
      const userListResult = await userModel.selectUser(connection);
      connection.release();
  
      return userListResult;
  
    } else {
      const connection = await development.getConnection(async (conn) => conn);
      const userListResult = await userModel.selectUserEmail(connection, email);
      connection.release();
  
      return userListResult;
    }
  };
  
  exports.retrieveUser = async function (email) {
    const connection = await development.getConnection(async (conn) => conn);
    const userResult = await userModel.selectUserEmail(connection, email);
  
    connection.release();
  
    return userResult[0];
  };
  
  exports.emailCheck = async function (email) {
    const connection = await development.getConnection(async (conn) => conn);
    const emailCheckResult = await userModel.selectUserEmail(connection, email);
    connection.release();
  
    return emailCheckResult;
  };
  
  exports.passwordCheck = async function (selectUserPasswordParams) {
    const connection = await development.getConnection(async (conn) => conn);
    const passwordCheckResult = await userModel.selectUserPassword(
        connection,
        selectUserPasswordParams
    );
    connection.release();
    return passwordCheckResult[0];
  };
  
  exports.accountCheck = async function (email) {
    const connection = await development.getConnection(async (conn) => conn);
    const userAccountResult = await userModel.selectUserAccount(connection, email);
    connection.release();
  
    return userAccountResult;
  };


exports.selectUser
/** 
// 모든 유저 조회
async function selectUser(connection) {
  const selectUserListQuery = `
                SELECT email, nickname 
                FROM UserInfo;
                `;
  const [userRows] = await connection.query(selectUserListQuery);
  return userRows;
}

// 이메일로 회원 조회
async function selectUserEmail(connection, email) {
  const selectUserEmailQuery = `
                SELECT email, nickname 
                FROM UserInfo 
                WHERE email = ?;
                `;
  const [emailRows] = await connection.query(selectUserEmailQuery, email);
  return emailRows;
}

// userId 회원 조회
async function selectUserId(connection, userId) {
  const selectUserIdQuery = `
                 SELECT id, email, nickname 
                 FROM UserInfo 
                 WHERE id = ?;
                 `;
  const [userRow] = await connection.query(selectUserIdQuery, userId);
  return userRow;
}

// 유저 생성
async function insertUserInfo(connection, insertUserInfoParams) {
  const insertUserInfoQuery = `
        INSERT INTO UserInfo(email, password, nickname)
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
        SELECT email, nickname, password
        FROM UserInfo 
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
        FROM UserInfo 
        WHERE email = ?;`;
  const selectUserAccountRow = await connection.query(
      selectUserAccountQuery,
      email
  );
  return selectUserAccountRow[0];
}

async function updateUserInfo(connection, id, nickname) {
  const updateUserQuery = `
  UPDATE UserInfo 
  SET nickname = ?
  WHERE id = ?;`;
  const updateUserRow = await connection.query(updateUserQuery, [nickname, id]);
  return updateUserRow[0];
}


module.exports = {
  selectUser,
  selectUserEmail,
  selectUserId,
  insertUserInfo,
  selectUserPassword,
  selectUserAccount,
  updateUserInfo,
};
*/