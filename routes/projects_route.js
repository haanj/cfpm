'use strict'
let User = require('../models/user_module')
let authenticate = require('../lib/authenticate')
let fs = require('fs')
let multer = require('multer')

module.exports = (router) => {

  router.route('/projects')
    .get((req, res) => {
      console.log('/projects hit with get')
      res.json('Hello login')
    })
    .post(authenticate)
    .post((req, res) => {
      console.log('/projects hit with post')
      console.log(req.headers)
      console.log(req)
      // fs.writeFileSync(__dirname + '/../data/'+req.headers.filename, buffer, res.json('Hello login'))
      fs.createWriteStream('/../data/'+req.headers.filename).pipe(req.body);
    })
}
