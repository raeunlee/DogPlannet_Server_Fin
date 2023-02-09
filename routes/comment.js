const express = require('express');
const doginfoController = require("../controllers/doginfo");
const commentRecordController = require('../controllers/comment');

const router = express.Router();

router.post('/comment',commentRecordController);
router.get

module.exports 

// 댓글 쓰기 -> post id
// 한 게시글에만 존재해야 한다.
// 한 게시글은 여러 댓글들을 소유하고 있는 것