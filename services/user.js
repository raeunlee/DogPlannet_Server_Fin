const {logger} = require("../config/winston");
const { pool } = require("../config/database");
const userModel = require('../models/users');
const baseResponse = require("../config/baseResponseStatus")
const secret_config = require("../config/secret");
const {response} = require("../config/response");
const {errResponse} = require("../config/response");
// const {connection}= require("../app")
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");
const { hasSubscribers } = require("diagnostics_channel");
//const {name}= require("ejs");

// Service: Create, Update, Delete 비즈니스 로직
// 유저 생성
exports.createUser = async function (email,password,name) {
    try {
        // 이메일 중복 확인
        const emailRows = await userModel.emailCheck(email);
        console.log(userModel.emailCheck);
        if (emailRows.length > 0)
            return errResponse(baseResponse.SIGNUP_REDUNDANT_EMAIL); 
        // crypto 모듈로 비밀번호 암호화
        const hashedPassword = await crypto
            .createHash("sha512")
            .update(password)
            .digest("hex");

        const insertUserInfoParams = [email, hashedPassword, name];

        const connection = await pool.getConnection(async (conn) => conn);

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
        
        //이메일 조회가 되는지 확인 
        console.log("이메일 확인", emailRows)

        const selectEmail = emailRows[0].email

        // 비밀번호 암호화 확인
        const hashedPassword = await crypto
            .createHash("sha512")
            .update(password)
            .digest("hex");

        console.log("입력비번", password)
        //console.log(hashedPassword)   

        //check용 여기가 지금 안됨!!
        const selectUserPasswordParams = [selectEmail, hashedPassword];
        const passwordRows = await userModel.passwordCheck(selectUserPasswordParams);
        console.log(passwordRows)

        if (passwordRows[0].password !== hashedPassword) {
            return errResponse(baseResponse.SIGNIN_PASSWORD_WRONG);
        } 
        // 계정 상태 확인
        const userInfoRows = await userModel.accountCheck(email);
    
        console.log("계정상태?", userInfoRows)

        if (userInfoRows[0].status === "INACTIVE") {
            return errResponse(baseResponse.SIGNIN_INACTIVE_ACCOUNT);
        } else if (userInfoRows[0].status === "DELETED") {
            return errResponse(baseResponse.SIGNIN_WITHDRAWAL_ACCOUNT);
        }

        console.log(userInfoRows[0].id) // DB의 userId(생성된)

        //토큰 생성 Service
        let token = await jwt.sign(
            {
                userEmail: userInfoRows[0].id,
            }, // 토큰의 내용(payload)
            secret_config.jwtsecret, // 비밀키
            {
                expiresIn: "365d",
                subject: "userInfo",
            } // 유효 기간 365일
        );
        
        //Id & JWT토큰
        return response(baseResponse.SUCCESS, {'Id': userInfoRows[0].id, 'jwt': token});
        
    } catch (err) {
        logger.error(`App - postSignIn Service error\n: ${err.message} \n${JSON.stringify(err)}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};


// 회원정보 수정
exports.editUser = async function (id, name) {
    try {
        console.log(id)
        const connection = await pool.getConnection(async (conn) => conn);
        const editUserResult = await updateUserInfo(connection, id, name)
        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - editUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}


 