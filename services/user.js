const {logger} = require("../../../config/winston");
const {development} = require("../config/config")
const userModel = require("../models/user");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");

// Service: Create, Update, Delete 비즈니스 로직

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

        const userIdResult = await userModel.insertUserInfo(connection, insertUserInfoParams);
        console.log(`추가된 회원 : ${userIdResult[0].insertId}`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};


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

        console.log(userInfoRows[0].email) // DB의 user email

        //토큰 생성 Service
        let token = await jwt.sign(
            {
                useremail: userInfoRows[0].email,
            }, // 토큰의 내용(payload)
            secret_config.jwtsecret, // 비밀키
            {
                expiresIn: "365d",
                subject: "userInfo",
            } // 유효 기간 365일
        );

        return response(baseResponse.SUCCESS, {'useremail': userInfoRows[0].email, 'jwt': token});

    } catch (err) {
        logger.error(`App - postSignIn Service error\n: ${err.message} \n${JSON.stringify(err)}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};


/*
exports.editUser = async function (id, nickname) {
    try {
        console.log(id)
        const connection = await development.getConnection(async (conn) => conn);
        const editUserResult = await userDao.updateUserInfo(connection, id, nickname)
        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - editUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}
*/


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