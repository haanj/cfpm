'use strict'
require('./user_module')
require('./version_module')
let mongoose = require('mongoose')

let projectSchema = new mongoose.Schema({
  projectName:  {type : String, unique : true, required : true, dropDups: true},
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  versions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Version'}],
  current: {type: mongoose.Schema.Types.ObjectId, ref: 'Version'}
})

module.exports = mongoose.model('Project', projectSchema)
