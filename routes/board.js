var express = require('express')
const router = express.Router();
const board = require('../controllers/board');

router.get('/articles',board.getBoard);
router.post('/article',board.postBoard);
router.get('/article/:id',board.getBoardId)
router.put('/article/:id',board.editBoard);
// router.delete('/article/:id',board.deleteBoard);

module.exports = router;

