// 미들웨어들
const express = require('express');
const path = require('path');
const app = express();
const port = 3000

//application Controllers for Routes
const doginfoRouter = require('./routes/doginfo');

//application routes
app.use(express.json());
app.use('/doginfo', doginfoRouter);



app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))