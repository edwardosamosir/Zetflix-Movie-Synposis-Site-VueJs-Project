if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express()  
const mainRouter = require('./routes')
const cors = require("cors");
const morgan = require("morgan");
// cross origin resource sharing
app.use(cors())
app.use(morgan('combined'))
// body parse
app.use(express.urlencoded({extended : false}))
app.use(express.json())

// main router
app.use('/', mainRouter)


module.exports = app