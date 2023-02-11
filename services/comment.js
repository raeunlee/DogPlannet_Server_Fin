const {logger} = require("../config/winston");
const {development} = require("../config/config");
const commentModel = require("../models/comment")
const baseResponse = require("../config/baseResponseStatus");
const {response} = require("../config/response");
const {errResponse} = require("../config/response");


exports.createComment = async function (email, password, username) {
    try{
        const connection = await development.getConnection(async (conn) => conn);
        
    } catch (err) {
        logger.error(`App - createComment Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};