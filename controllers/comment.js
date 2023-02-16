const baseResponseStatus = require('../config/baseResponseStatus');
const commentService = require("../services/comment")
const {response} = require("../config/response");

exports.getTest = async function (req, res) {
    const userDb = await commentService.serviceDb();
    return res.send(userDb);
}

exports.postComment = async(req,res) => {
    /*
     * Body : content,writer
     * router.post('/',comment.postComment);
     */
    // console.log(req.body);
    const {post_id,writer,content} = req.body;

    if (!writer)
        return res.send(response(baseResponseStatus.USER_NICKNAME_EMPTY));
    
    // response 변경하기
    if (!content)
        return res.send(response(baseResponseStatus.USER_NICKNAME_EMPTY));

    const saveCommentResponse = await commentService.createComment(
            post_id,
            writer,
            content
        );
    
    return res.send(saveCommentResponse);
}

// 해당 유저가 쓴 comment들
exports.findComment = async(req,res) => {
    const user_id = req.query.id;
    // if (!) # db에 존재하는 id가 맞는지 검사하는 로직 필요
    const findCommentResponse = await commentService.findComment(
        user_id
    );

    return res.send(findCommentResponse);
}

// exports.fetchComment = async(req,res) => {
//     const user_id = req.query.id;
//     const comment = req.body;
//     // if (!) # db에 존재하는 id가 맞는지 검사하는 로직 필요
//     const fetchCommentResponse = await commentService.fetchComment(
//         user_id,
//         comment
//     );

//     return res.send(fetchCommentResponse);
// }

// exports.deleteComment = async(req,res) => {
//     const post_id = req.query.id;
//     // if (!) # db에 존재하는 id가 맞는지 검사하는 로직 필요
//     const deleteCommentResponse = await commentService.deleteComment(
//         post_id
//     );

//     return res.send(deleteCommentResponse);
// }
