const {logger} = require("../config/winston");
const boardModel = require("../models/board");
const baseResponse = require("../config/baseResponseStatus");
const { pool } = require("../config/database");
const {response} = require("../config/response");
const {errResponse} = require("../config/response");

exports.getBoard = async function() {
    try{
        const connection = await pool.getConnection(async (conn) => conn);
        const boardDb = await boardModel.getBoardDb(connection);
        connection.release();
    
        return boardDb;
    }
    catch (err) {
        logger.error(`App - getBoard Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.getBoardId = async function(board_id) {
	try{
        const connection = await pool.getConnection(async (conn) => conn);
        const boardDb = await boardModel.getBoardDbId(connection,board_id);
		[title,content] = Object.values(boardDb);
		connection.release();
		return boardDb;
    }
    catch (err) {
        logger.error(`App - getBoardId Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};


exports.createBoard = async function(title,user_id,dog_name,content) {
    try{
        const postBoardParam = [title,user_id,dog_name,content];
        const connection = await pool.getConnection(async (conn) => conn);
        const postBoardDb = await boardModel.postBoardDb(connection,postBoardParam);
        connection.release();
        return postBoardDb;
    }
    catch (err) {
        console.log("postBoard service에 대한 오류")
        logger.error(`App - postBoard Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.editBoard = async function (board_id,title,content) {
	try{
        const editBoardParam = [title,content,board_id];
        const connection = await pool.getConnection(async (conn) => conn);
        const editBoardDb = await boardModel.editBoardDb(connection,editBoardParam);
        connection.release();
        return editBoardDb;
    }
    catch (err) {
        console.log("editBoard service에 대한 오류")
        logger.error(`App - editBoard Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};