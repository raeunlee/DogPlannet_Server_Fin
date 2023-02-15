
const jwtMiddleware = require('../config/JwtMiddelWare');
const userService = require("../services/user");
const userModel = require("../models/users")
const baseResponse = require("../config/baseResponseStatus");
const {logger} = require("../config/winston");
const {response} = require("../config/response");
const {errResponse} = require("../config/response");

const regexEmail = require("regex-email"); //자바스크립트 이메일 유효성 검사
const {emit} = require("nodemon");

/**
 * API No. 0
 * API Name : 테스트 API
 * [GET] /user/test
 */

exports.getTest = async function (req, res) {
     return res.send(response(baseResponse.SUCCESS))
 }

/**
 * API No. 1
 * API Name : 유저 생성 (회원가입) API
 * [POST] /user/signup
 * username, email, password 값이 다 채워졌는지, 이메일 중복확인 및 유효성 검사, 비밀번호 8자리 이상, 비밀번호 확인 일치 검사)
 * password 체크도 백에서 구햔?
 */
exports.postUsers = async function (req, res) { 

    /**
     * Body: username, email, password
     */
    const {username, email, password} = req.body;

    //예외처리 정리

    // username
    // 빈 값 체크
    if (!username)
        return res.send(response(baseResponse.SIGNUP_NAME_EMPTY));
    
    // 길이 체크
    if (username.length<2)
        return res.send(response(baseResponse.SIGNUP_NAME_LENGTH));

    // email
    // 빈 값 체크
    if (!email)
        return res.send(response(baseResponse.SIGNUP_EMAIL_EMPTY));

    // 길이 체크
    if (email.length > 30)
        return res.send(response(baseResponse.SIGNUP_EMAIL_LENGTH));

    // 형식 체크 (정규표현식 이용)
    if (!regexEmail.test(email))
        return res.send(response(baseResponse.SIGNUP_EMAIL_ERROR_TYPE));

    // password
    // 빈 값 체크
    if (!password)
        return res.send(response(baseResponse.SIGNUP_PASSWORD_EMPTY));
    
    // 길이 체크
    if (password.length < 8 || password.length>20)
        return res.send(response(baseResponse.SIGNUP_PASSWORD_LENGTH));
    

    const signUpResponse = await userService.createUser(
        username,
        email,
        password
    );

    return res.send(signUpResponse);
};

/**
 * API No. 2
 * API Name : 유저 조회 API (+ 이메일로 검색 조회)
 * [GET] user/findusers
 */
exports.getUsers = async function (req, res) {

    /**
     * Query String: email
     */
    const email = req.query.email;

    if (!email) {
        // 유저 전체 조회
        const userListResult = await userModel.retrieveUserList();
        return res.send(response(baseResponse.SUCCESS, userListResult));
    } else {
        // 유저 검색 조회
        const userListByEmail = await userModel.retrieveUserList(email);
        return res.send(response(baseResponse.SUCCESS, userListByEmail));
    }
};



/**
 * API No. 3
 * API Name : 특정 유저 조회 API
 * [GET] user/findusers/{userId}
 */
exports.getUserById = async function (req, res) {

    /**
     * Path Variable: userEmail
     */
    const userId= req.params.userId;

    if (!userId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

    const getUserById= await userModel.retrieveUser(userId);
    return res.send(response(baseResponse.SUCCESS, getUserById));
};



/**
 * API No. 4
 * API Name : 로그인 API
 * [POST] /user/login
 * body : email, passsword
 */
exports.login = async function (req, res) {

    const {email, password} = req.body;

    // TODO: email, password 형식적 Validation

    const signInResponse = await userS.postSignIn(email, password);

    return res.send(signInResponse);
};

/** */
/*** API No. 5
 * API Name : 회원 정보 수정 API + JWT + Validation
 * [PATCH] /app/users/:userEmail
 * path variable : userEmail
 * body : nickname 
 **/
/**
 * exports.patchUsers = async function (req, res) {

    // jwt - userEmail, path variable :userEmail

    const userEmail = req.params.userEmail;

    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        if (!nickname) return res.send(errResponse(baseResponse.USER_NICKNAME_EMPTY));

        const editUserInfo = await userService.editUser(userId, nickname)
        return res.send(editUserInfo);
    }
};
*/



/** JWT 토큰 검증 API
 * [GET] /app/auto-login
 */
exports.check = async function (req, res) {
    const userIdResult = req.verifiedToken.userId;
    console.log(userIdResult);
    return res.send(response(baseResponse.TOKEN_VERIFICATION_SUCCESS));
};


