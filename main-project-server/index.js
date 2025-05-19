require('dotenv').config()
const express = require('express')
const cors = require('cors')
require('./database/dbConnection')
const router = require('./routes/router')

const mainServer = express()

mainServer.use(cors())
mainServer.use(express.json())
mainServer.use(router)
mainServer.use('/uploads', express.static('uploads'));

const PORT = 3001 || process.env.PORT

mainServer.listen(PORT, ()=>{
    console.log(`mainServer running in ${PORT}`);
})


