
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
// const jwtMiddleware = require('../../../config/jwtMiddleware');

 // 0. 테스트 API
 router.get('/test', userController.getTest)

 // 1. 유저 생성 (회원가입) API
 router.post('/signup', userController.postUsers);

 // 2. 유저 조회 API (+ 검색)
 router.get('/findusers',userController.getUsers); 

 // 3. 특정 유저 조회 API
 router.get('/findusers/:userEmail', userController.getUserByEmail);

 //jwt
 // 로그인 하기 API (JWT 생성)
 // router.post('/login', userController.login);

 // 회원 정보 수정 API (JWT 검증 및 Validation - 메소드 체이닝 방식으로 jwtMiddleware 사용)
 // router.patch('/app/users/:userId', jwtMiddleware, userController.patchUsers)
 module.exports = router;


/**
module.exports = function(app){
    const express = require('express');
    const router = express.Router();
    const user = require('../controllers/user');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 0. 테스트 API
    app.get('/test', user.getTest)

    // 1. 유저 생성 (회원가입) API
    app.post('/signup', user.postUsers);

    // 2. 유저 조회 API (+ 검색)
    app.get('/findusers',user.getUsers); 

    // 3. 특정 유저 조회 API
    app.get('/findusers/:userEmail', user.getUserByEmail);

    //jwt
    // 로그인 하기 API (JWT 생성)
    app.post('/login', user.login);

    // 회원 정보 수정 API (JWT 검증 및 Validation - 메소드 체이닝 방식으로 jwtMiddleware 사용)
    // app.patch('/app/users/:userId', jwtMiddleware, user.patchUsers)

};
*/
// 자동로그인 API (JWT 검증 및 Payload 내뱉기)
// JWT 검증 API
// app.get('/app/auto-login', jwtMiddleware, user.check);

// TODO: 탈퇴하기 API