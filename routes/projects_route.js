'use strict'
// let User = require('../models/user_module')
// let authenticate = require('../lib/authenticate')
let fs = require('fs')
let formidable = require('formidable')
let util = require('util')

module.exports = (router) => {

  router.route('/projects')
    .get((req, res) => {
      console.log('/projects hit with get')
      res.json('Hello login')
    })
    // .post((req, res) => console.log('post to /projects'))
    .post((req, res, next) => {
      let form = new formidable.IncomingForm()
      form.uploadDir = __dirname + '/../data/'
      form.keepExtensions = true
      form.parse(req, function(err, fields, files) {
        res.writeHead(200, {'content-type': 'text/plain'});
        res.write('received upload:\n\n');
        res.end(util.inspect({fields: fields, files: files}));
      });

      // form.on('end', () => {
      //   res.json('thanks')
      // })

    })
    // .post((req, res) => {
    //   let body = ''
    //   req.on('data', (chunk) => {
    //     body += chunk
    //   })
    //   req.on('end', () => {
    //     console.log(body)
    //     fs.writeFile(__dirname + '/../data/'+req.headers.filename, body, () => res.json('post received'))
    //   })
    // })
}
