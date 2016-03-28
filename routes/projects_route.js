'use strict'
let User = require('../models/user_module')
let authenticate = require('../lib/authenticate')

module.exports = (router) => {
  router.route('/projects')
    .get((req, res) => {
      console.log('/projects hit with get')
      res.json('Hello login')
    })
    .post(authenticate)
    .post((req, res) => {
      console.log('/projects hit with post')
      res.json('Hello login')
    })
}
