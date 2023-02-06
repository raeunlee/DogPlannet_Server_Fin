// 미들웨어들
const express = require('express');
const path = require('path');
const app = express();



const port = 3306



app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))