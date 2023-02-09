const {pool} = require("../../../config/database");
const commentModel = require("../models/comment");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");


exports.createComment = async function (email, password, username) {
    try{
        const connection = await pool.getConnection(async (conn) => conn);
        
    } catch (err)
}