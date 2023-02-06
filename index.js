const express = require('express')
const {logger} = require('./config/winston');
const app = express()

const port = 3000
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
logger.info(`${process.env.NODE_ENV} - API Server Start At Port ${port}`);