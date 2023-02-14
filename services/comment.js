const {logger} = require("../config/winston");
const commentModel = require("../models/comment");
const baseResponse = require("../config/baseResponseStatus");

// 조회할때는 writer을 통해서 해당 사람의 id를 가져올 필요가 있음

exports.createComment = async function (writer,comment) {
    try{
        // writer 있는 사람인지 확인 필요
        const postCommentParam = [writer, comment];
        const connection = await pool.getConnection(async (conn) => conn);
        //아래에서 부터 수정하기 
        const postCommentResult = await commentModel.insertUserInfo(connection, postCommentParam);
        console.log(`comment : ${postCommentResult[0].insertId}`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    
    }
};

exports.findComment = async function (user_id) {
    try{
        // writer 있는 사람인지 확인 필요
        const postCommentParam = [writer, comment];
        const connection = await pool.getConnection(async (conn) => conn);
        //아래에서 부터 수정하기 
        const postCommentResult = await commentModel.insertUserInfo(connection, postCommentParam);
        console.log(`comment : ${postCommentResult[0].insertId}`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    
    }
};

exports.fetchComment = async function (user_id,comment) {
    try{
        // writer 있는 사람인지 확인 필요
        const postCommentParam = [writer, comment];
        const connection = await pool.getConnection(async (conn) => conn);
        //아래에서 부터 수정하기 
        const postCommentResult = await commentModel.insertUserInfo(connection, postCommentParam);
        console.log(`comment : ${postCommentResult[0].insertId}`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    
    }
};

exports.deleteComment = async function (user_id) {
    try{
        // writer 있는 사람인지 확인 필요
        const postCommentParam = [writer, comment];
        const connection = await pool.getConnection(async (conn) => conn);
        //아래에서 부터 수정하기 
        const postCommentResult = await commentModel.insertUserInfo(connection, postCommentParam);
        console.log(`comment : ${postCommentResult[0].insertId}`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    
    }
};