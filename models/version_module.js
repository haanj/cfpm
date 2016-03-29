'use strict'
require('./archive_module')
let mongoose = require('mongoose')

let versionSchema = new mongoose.Schema({
  major: Number,
  minor: Number,
  patch: Number,
  comment: String,
  archive: {type: mongoose.Schema.Types.ObjectId, ref: 'Archive'}
})

module.exports = mongoose.model('Version', versionSchema)
