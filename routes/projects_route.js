'use strict'
// let User = require('../models/user_module')
// let authenticate = require('../lib/authenticate')
let fs = require('fs')
let formidable = require('formidable')

module.exports = (router) => {

  router.route('/projects')
    .get((req, res) => {
      console.log('/projects hit with get')
      res.json('Hello login')
    })
    // .post((req, res) => console.log('post to /projects'))
    // .post((req, res, next) => {
    //   let form = new formidable.IncomingForm();
    //
    //   form.parse(req, function(err, fields, files) {
    //     res.writeHead(200, {'content-type': 'text/plain'});
    //     res.write('received upload:\n\n');
    //     res.end(util.inspect({fields: fields, files: files}));
    //   });
    //   form.on('file', function(name, file) {
    //     console.log(name, file)
    //   })
    //
    //   form.on('end', () => {
    //     next();
    //   })
    //
    // })
    .post((req, res) => {
      let body = ''
      req.on('data', (chunk) => {
        body += chunk
      })
      req.on('end', () => {
        console.log(req.body)
        fs.writeFile(__dirname + '/../data/'+req.headers.filename, body, () => res.json('post received'))
      })
    })
}
