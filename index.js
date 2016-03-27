'use strict'
let S_PORT = Number(process.env.S_PORT) || require('./.config').S_PORT
let DB = process.env.DB || require('./.config').DB

let mongoose = require('mongoose')
mongoose.connect(DB)

let bodyParser = require('body-parser')
let express = require('express')
let app = express()



app.use(bodyParser)

app.listen(S_PORT, () => {
  console.log('App listening at port', S_PORT)
})
