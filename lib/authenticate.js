'use strict'
let jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  let decoded
  try {
    // header from Authorization: token myToken
    let token = req.headers.authorization.split(' ')[1]
    decoded = jwt.verify(token, process.env.SECRET || 'secrets')
  }
  catch (e) {
    console.log('authenticate.js catch error:')
    console.log(req.headers)
    console.log(e)
    return res.status(400).json({msg: 'authentication error'}) //I am a teapot
  }
  let User = require('../models/user_module')
  User.findOne({_id: decoded._id})
    .then(user => {
      req.user = user
      next()
    })
    .catch((err) => {
      res.status(400).json({msg: err})
    })
}
