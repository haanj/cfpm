'use strict'
let mongoose = require('mongoose') // needed to create the db schema/model
let bcrypt = require('bcrypt') // needed to hash the password before saving
let jwt = require('jsonwebtoken') // generates webtoken for the user

// the mongoose schema for storing user info in mongodb
let userSchema = mongoose.Schema({
  userName: {type : String, unique : true, required : true, dropDups: true}, // each user will have a unique userName
  name: String,
  password: {type: String, required: true}
})

// bcrypt hashes the password on each new user document before saving to mongodb
userSchema.pre('save', function(next) {
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10))
  next()
})

// generates password hash
userSchema.methods.generateToken = function() {
  return jwt.sign({_id: this._id}, process.env.SECRET || 'secrets')
}

userSchema.methods.compareHash = function(pass, hash) {
  return bcrypt.compareSync(pass, hash)
}

// creates the mongoose model from the above schema
let User = mongoose.model('User', userSchema)

// exports this model
module.exports = User


// creates test user
var newUser = new User({userName: 'haanj', name: 'Joshua', password: 'password123'})
newUser.save()
