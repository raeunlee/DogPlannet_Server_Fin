async function getBoardDb(connection) {
    // 중요 *** 나중에 pagination이 필요함
    const sql = `
        select * from posts; 
    `
    const [[dbRows,fields]] = await connection.query(sql);
    // console.log("뭐 아무튼 성공");
    console.log(dbRows);
    return dbRows;
}

async function getBoardDbId(connection,board_id) {
    const sql = `
        select title,content
        from posts
        where id = ?;
    `;
    const [[dbRows]] = await connection.query(sql,board_id);
    console.log(dbRows);
    return dbRows;
    // title, content존재
}

async function postBoardDb(connection,postBoardParam) {
    try{
        const sql = `
            insert into posts(title,user_id,dog_name,content)
            values (?,?,?,?);
        `;
        const [dbRows] = await connection.query(sql,postBoardParam);
        console.log(dbRows);

        return dbRows;
    } catch (err) {
        console.log("postBoardDb에러")
        logger.error(`App - postBoardDb\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

async function editBoardDb(connection,editBoardParam) {
    // board_id,title,content
    try{
        const sql = `
            update posts set title =?,content = ? where id = ?;
        `;
        const [dbRows] = await connection.query(sql,editBoardParam);
        return dbRows;
    } catch (err) {
        console.log("editBoardDb에러")
        logger.error(`App - editBoardDb\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

module.exports = {
    getBoardDb,
    getBoardDbId,
    postBoardDb,
    editBoardDb
}