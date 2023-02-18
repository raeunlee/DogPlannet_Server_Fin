async function getBoardDb(connection) {
    // 중요 *** 나중에 pagination이 필요함
    const sql = `
        select * from posts; 
    `
    const [dbRows] = await connection.query(sql);
    // console.log("뭐 아무튼 성공");
    return dbRows;
}


module.exports = {
    getBoardDb
}