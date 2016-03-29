'use strict'
let mongoose = require('mongoose')

let archiveSchema = new mongoose.Schema({
  uri: String
})

module.exports = mongoose.model('Archive', archiveSchema)
