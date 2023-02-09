// User 컨트롤러 - 요청 받고 서비스 계층에서 받은 데이터로 응답하기, 비즈니스 로직 분리할것
/*
jwt?
1. 사용자가 아이디 패스워드로 로그인 (우리는 이메일)
2. 서버는 시크릿 키를 통해 접근 토큰 발급
3. 사용자에게 JWT 전달
4. 로그인이 필요한 API호출시 헤더에 JWT를 담아 전송함
5. 서버에서 JWT 서명을 확인하고 시크릿 키로 JWT를 디코드하여 사용자 정보 획득
6. 서버에서 유저를 인식하고 요청 사항에 응답

node jwt 구현 예제 
https://charming-kyu.tistory.com/4

JWT의 구성은 다음과 같이 이루어져있다.

header : 토큰의 타입, 데이터 서명 방식 명시
payload : 전달되는 데이터
signature : 헤더와 페이로드의 전자서명
*/
const jwtMiddleware = require('../config/JwtMiddelWare');
const userService = require("../services/user")
const baseResponse = require("../config/baseResponseStatus")

const {response} = require("../config/response");
const {errResponse} = require("../config/response");

const regexEmail = require("regex-email"); //자바스크립트 이메일 유효성 검사
const {emit} = require("nodemon");

/**
 * API No. 0
 * API Name : 테스트 API
 * [GET] /app/test
 */

exports.getTest = async function (req, res) {
     return res.send(response(baseResponse.SUCCESS))
 }

/**
 * API No. 1
 * API Name : 유저 생성 (회원가입) API
 * [POST] /app/users
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
 * [GET] /app/users
 */
exports.getUsers = async function (req, res) {

    /**
     * Query String: email
     */
    const email = req.query.email;

    if (!email) {
        // 유저 전체 조회
        const userListResult = await userService.retrieveUserList();
        return res.send(response(baseResponse.SUCCESS, userListResult));
    } else {
        // 유저 검색 조회
        const userListByEmail = await userService.retrieveUserList(email);
        return res.send(response(baseResponse.SUCCESS, userListByEmail));
    }
};



/**
 * API No. 3
 * API Name : 특정 유저 조회 API
 * [GET] /app/users/{useremail}
 */
exports.getUserByEmail = async function (req, res) {

    /**
     * Path Variable: userEmail
     */
    const userEmail = req.params.userEmail;

    if (!userEmail) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

    const userByUserEmail= await userService.retrieveUser(userEmail);
    return res.send(response(baseResponse.SUCCESS, userByUserEmail));
};



/**
 * API No. 4
 * API Name : 로그인 API
 * [POST] /app/login
 * body : email, passsword
 */
exports.login = async function (req, res) {

    const {email, password} = req.body;

    // TODO: email, password 형식적 Validation

    const signInResponse = await userService.postSignIn(email, password);

    return res.send(signInResponse);
};



// 멍플에는 회원정보 수정의 경우 비밀번호 수정만 존재함 현재 비밀번호를 맞게 썼는지 확인만 하면 됨 
/*** API No. 5
 * API Name : 회원 정보 수정 API + JWT + Validation
 * [PATCH] /app/users/:userId
 * path variable : userId
 * body : nickname 
 **/
exports.patchUsers = async function (req, res) {

    // jwt - userId, path variable :userId

    const userIdFromJWT = req.verifiedToken.userId

    const userId = req.params.userId;
    const nickname = req.body.nickname;

    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        if (!nickname) return res.send(errResponse(baseResponse.USER_NICKNAME_EMPTY));

        const editUserInfo = await userService.editUser(userId, nickname)
        return res.send(editUserInfo);
    }
};



/** JWT 토큰 검증 API
 * [GET] /app/auto-login
 */
exports.check = async function (req, res) {
    const userIdResult = req.verifiedToken.userId;
    console.log(userIdResult);
    return res.send(response(baseResponse.TOKEN_VERIFICATION_SUCCESS));
};


