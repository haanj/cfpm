'use strict'
let authenticate = require('../lib/authenticate')
let fs = require('fs')
let formidable = require('formidable')
let util = require('util')

module.exports = (router) => {

  router.route('/projects')
    .get((req, res) => {
      console.log('/projects hit with get')
      res.json('Hello login')
    })
    .post((req, res, next) => {
      console.log('/projects hit with post request')
      next()
    })
    .post(authenticate)
    .post((req, res, next) => {
      let form = new formidable.IncomingForm()
      form.uploadDir = __dirname + '/../data/'
      form.keepExtensions = true
      form.parse(req, function(err, fields, files) {
        console.log(files)
        res.writeHead(200, {'content-type': 'text/plain'});
        res.write('received upload:\n\n');
        res.end(util.inspect({fields: fields, files: files}));
      });

    })
}
