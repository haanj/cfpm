'use strict'
let mongoose = require('mongoose')

let fileSchema = new mongoose.Schema({
  fileName: String,
  directory: String,
  uri: String
})

module.exports = mongoose.model('File', fileSchema)
