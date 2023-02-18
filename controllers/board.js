const baseResponseStatus = require('../config/baseResponseStatus');
const boardService = require("../services/board")
const {response} = require("../config/response");

exports.getBoard = async(req,res) => {
    /**
     * router.get('/articles',board.getBoard);
     * board 에 있는 모든 정보를 가지고 옴
     */
    const returnBoard = await boardService.getBoard();

    return res.send(returnBoard);
}

exports.getBoardId = async(req,res) => {
    /**
     * router.get('/article/:id',board.getBoardId)
     * board 에서 특정아이디에 관하여 content와 title을 들고오게끔 함
     */

    const board_id = req.params.id;
    if (!board_id)
        return res.send("controller getBoardId board_id 비어있음")
    const getBoardIdResponse = await boardService.getBoardId(board_id);
    return res.send(getBoardIdResponse);
}

exports.postBoard = async(req,res) => {
    /**
     * router.post('/article',board.postBoard);
     * board 에 글을 작성
     */
    const {title,user_id,dog_name,content} = req.body;
    // 좋아요 삭제 -> 나중에 생각하기
    console.log(req.body);
    if (!title)
        return res.send("title 비어있음")
    if (!user_id)
        return res.send("user_id 주세요")
    if (!dog_name)
        return res.send("강아지 이름이 없습니다")
    if (!content)
        return res.send("content필요함")

    const saveBoardResponse = await boardService.createBoard(
            title,
            user_id,
            dog_name,
            content
        );

    return res.send(saveBoardResponse);
}

exports.editBoard = async(req,res) => {
    console.log()
    /**
     * router.put('/article/:id',board.editBoard);
     * 작성된 글을 토대로 수정
     * board_id, title, content 필요
     */
    const board_id = req.params.id;
    var {title,content} = req.body;
    // 좋아요 삭제 -> 나중에 생각하기
    if (!board_id)
        return res.send("board_id 비어있음")
    
    if (!title){
        const getBoardIdResponse = await boardService.getBoardId(board_id);
        //[title,content] = Object.values(boardDb);
        console.log(getBoardIdResponse);
        var [rr,ss] = Object.values(getBoardIdResponse);
        title = rr
        console.log(`원래 있던 title${title}`);
    }

    if (!content){
        const getBoardIdResponse = await boardService.getBoardId(board_id);
        var [bb,cc] = Object.values(getBoardIdResponse);
        content = cc;
        console.log(`원래 있던 content${content}`);
    }
    
    const editBoardResponse = await boardService.editBoard(
        board_id,
        title,
        content
    );
    return res.send(editBoardResponse);
} 
