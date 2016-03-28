'use strict'
let User = require('../models/user_module')

module.exports = (router) => {
  router.route('/login')
    .get((req, res) => {
      console.log('/login hit')
      res.json('Hello world')
    })
    .post((req, res) => {
      console.log('/login hit')

      try {
        let authHeader = req.headers.authorization.split(' ')
        let authArray = new Buffer(authHeader[1], 'base64').toString().split(':')

        let userName = authArray[0]
        let password = authArray[1]

        User.findOne({userName: userName}, (err, user) => {
          if (!user) {return res.json({status: 'failure'})}

          let valid = user.compareHash(password, user.password)
          if (!valid) {
            return res.json({status: 'failure'})
          }

          res.json({status: 'success', token: user.generateToken()})
        })
      }
      catch(err) {
        console.log(err)
        return res.json({status: 'failure'})
      }

    })
}
