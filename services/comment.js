const {logger} = require("../config/winston");
const commentModel = require("../models/comment");
const baseResponse = require("../config/baseResponseStatus");
const { pool } = require("../config/database");
const Dao = require("../models/comment");
const {response} = require("../config/response");
const {errResponse} = require("../config/response");
// 조회할때는 writer을 통해서 해당 사람의 id를 가져올 필요가 있음

exports.serviceDb = async function () {
    const connection = await pool.getConnection(async (conn) => conn);
    const commentDb = await Dao.selectDb(connection);
    connection.release();
  
    return commentDb;
  }

exports.createComment = async function (post_id,dog_name,content,user_id) {
    console.log("들어옴")
    try{
        // dog_name 있는 사람인지 확인 필요
        const postCommentParam = [post_id,dog_name, content,user_id];
        const connection = await pool.getConnection(async (conn) => conn);
        //아래에서 부터 수정하기 
        const postCommentResult = await Dao.createDb(connection,postCommentParam);
        connection.release();
        return postCommentResult; // 추후 수정 필요함
        // return response(baseResponse.SUCCESS);
    } catch (err) {
        console.log("createCommentService에러")
        logger.error(`App - createUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

// exports.findUserId -> find comment 할때 user_id 가져오는 작업 필요

exports.findComment = async function (user_id) {
    try{
        const connection = await pool.getConnection(async (conn) => conn);
        const postCommentResult = await commentModel.findUserComment(connection, user_id);
        connection.release();
        return postCommentResult;
        // return response(baseResponse.SUCCESS);
    } catch (err) {
        logger.error(`App - createUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    
    }
};

// exports.fetchComment = async function (user_id,comment) {
//     try{
//         // dog_name 있는 사람인지 확인 필요
//         const postCommentParam = [dog_name, comment];
//         const connection = await pool.getConnection(async (conn) => conn);
//         //아래에서 부터 수정하기 
//         const postCommentResult = await commentModel.insertUserInfo(connection, postCommentParam);
//         console.log(`comment : ${postCommentResult[0].insertId}`)
//         connection.release();
//         return response(baseResponse.SUCCESS);


//     } catch (err) {
//         logger.error(`App - createUser Service error\n: ${err.message}`);
//         return errResponse(baseResponse.DB_ERROR);
    
//     }
// };

// exports.deleteComment = async function (user_id) {
//     try{
//         // dog_name 있는 사람인지 확인 필요
//         const postCommentParam = [dog_name, comment];
//         const connection = await pool.getConnection(async (conn) => conn);
//         //아래에서 부터 수정하기 
//         const postCommentResult = await commentModel.insertUserInfo(connection, postCommentParam);
//         console.log(`comment : ${postCommentResult[0].insertId}`)
//         connection.release();
//         return response(baseResponse.SUCCESS);


//     } catch (err) {
//         logger.error(`App - createUser Service error\n: ${err.message}`);
//         return errResponse(baseResponse.DB_ERROR);
    
//     }
// };