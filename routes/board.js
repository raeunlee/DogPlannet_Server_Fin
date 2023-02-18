var express = require('express')
const router = express.Router();
const board = require('../controllers/board');

router.get('/articles',board.getBoard)

module.exports = router;

