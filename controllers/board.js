const baseResponseStatus = require('../config/baseResponseStatus');
const boardService = require("../services/board")
const {response} = require("../config/response");

exports.getBoard = async(req,res) => {
    /**
     * router.get('/',board.getBoard);
     * board 에 있는 모든 정보를 가지고 옴
     */
    const returnBoard = await boardService.getBoard();

    return res.send(returnBoard);
}