// 게시물 CRUD, 좋아요 로작 담당
const Post = require("../models/posts");

// Date를 2023-02-07 형식으로 바꿔주는 함수.
const formatDate = (date) => {
    let d = new Date(date);
    let month = ("" + (d.getMonth() + 1)).padStart(2, "0");
    let day = ("" + d.getDate()).padStart(2, "0");
    let year = d.getFullYear();
  
    return [year, month, day].join('-');
}

// 게시물 컨트롤러 객체
const postCtr = {
  
    // 1. create : upload func
    upload: async (req, res) => {
        const { title, content } = req.body;
        const image = req.file.location; // image 는 S3에서 불러온다.
        const publishedDate = formatDate(new Date());
        const post = new Post({
            title: title,
            content: content,
            image: image,
            publishedDate: publishedDate,
            user: req.userInfo // 항상 jwt 토큰을 요청에 포함해서 보내기 때문에 req에 userInfo가 있다.
        });

        try {
            await post.save();
            res.redirect("/");
        } catch(error) {
            res.status(500).send("upload error!");
        }
    },
  

    // 2. read : 메인 페이지에서 글 전체 list 조회 해야함.
    list : async (req, res) => {
        const posts = await Post.find({}); // 전체 게시물 가져올거라 {}로 찾는다.
        res.render("index", { postList: posts });
    },
  
    // 2. read : 글 하나하나를 조회
    detail: async (req, res) => {
        const { id } = req.params;
        const post = await Post.findById(id);
        res.render("detail", { post : post });
    },
  
    // 3. update : update 할 때 update 페이지에 기존 글의 정보가 넘어오도록
    updateLayout: async (req, res) => {
        const {id} = req.params;
        const post = await Post.findById(id);
        res.render("update", { post : post });
    },
  // 업데이트 버튼 누르면 업데이트 됨.
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { title, content } = req.body;
            await Post.findByIdAndUpdate(
                id, 
                { title, content }, 
                { new: true } // 업데이트 되면 새로 받아올건지. 안하면 기존 post를 받아오게 됨.
            );
            res.redirect("/");
        } catch(error) {
            res.status(500).send("update error");
        }
    },
  
    // 4. delete
    delete: async (req, res) => {
        try {
            const {id} = req.params;
            await Post.findByIdAndDelete(id);
            res.redirect("/");
        } catch(error) {
            res.status(500).send("delete error");
        }

    }
}
//좋아요
like: async (req, res) => {
        const { id } = req.params;
        const post = await Post.findById(id);
        // jwt 생성시 req.userInfo 를 넣었기 때문에 사용 가능.
        const check = post.likeUser.some(userId => userId === req.userInfo._id);
        if (check) {
            post.likeCount -= 1;
            const idx = post.likeUser.indexOf(req.userInfo._id);
            if (idx > -1) {
                post.likeUser.splice(idx, 1);
            }
        } else {
            post.likeCount += 1;
            post.likeUser.push(req.userInfo._id);
        }
        const result = await post.save();
        res.status(200).json({
            check: check,
            post: result
        });
    }

module.exports = postCtr;
