'use strict';
// require('./actor_module');
let mongoose = require('mongoose');

let projectSchema = new mongoose.Schema({
  projectName:  {type : String, unique : true, required : true, dropDups: true},
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  files: [{type: mongoose.Schema.Types.ObjectId, ref: 'File'}]
});

module.exports = mongoose.model('Movie', movieSchema);
