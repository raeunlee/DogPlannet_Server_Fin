var express = require('express')
const router = express.Router();
var bodyParser = require('body-parser')
const doginfoController = require("../controllers/doginfo");
const comment = require('../controllers/comment');



router.get('/test', comment.getTest)
// 댓글 저장
router.post('/post',comment.postComment);

// 댓글 전체 조회
router.get('/:id',comment.findComment);

/*
// 댓글 수정
// router.patch('/:id',comment.updateComment);

router.delete('/:id',comment.deleteComment);
*/
module.exports = router;

