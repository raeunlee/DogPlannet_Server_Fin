const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../config/JwtMiddelWare');
const userController = require('../controllers/user');
var bodyParser = require('body-parser');

 // 0. 연결 테스트 API
 router.get('/test', userController.getTest)

 // 1. 유저 생성 (회원가입) API
 router.post('/signup', userController.postUsers);

 // 2. 유저 조회 API (+ 검색)
 router.get('/findusers',userController.getUsers); 

 // 3. 특정 유저 조회 API
 
 router.get('/findusers/:userId', userController.getUserById);

 // 4. 로그인 하기 API (JWT 생성)
 router.post('/login', userController.login);

 /*
 // 5. 회원 정보 수정 API (JWT 검증 및 Validation - 메소드 체이닝 방식으로 jwtMiddleware 사용)
 router.patch('/:userEmail', jwtMiddleware, userController.patchUsers)
 module.exports = router;
*/

// 자동로그인 API (JWT 검증 및 Payload 내뱉기)
// JWT 검증 API
// app.get('/app/auto-login', jwtMiddleware, user.check);

// 로그아웃, 탈퇴하기 API 필요 

module.exports = router;