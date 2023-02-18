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
        console.log("Why")
        logger.error(`App - getBoard Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};
