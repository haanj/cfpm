'use strict'
let authenticate = require('../lib/authenticate')
let projectLookup = require('../lib/projectLookup')
let addPackage = require('../lib/addPackage')
let updatePackage =require('../lib/updatePackage')
// let fs = require('fs')
let formidable = require('formidable')
let util = require('util')

module.exports = (router) => {
  // Accepts new projects
  router.route('/projects')
    .get((req, res) => {
      console.log('/projects hit with get')
      res.json('Hello login')
    })
    .post((req, res, next) => {
      console.log('/projects hit with post request')
      next()
    })
    // Authenticates user and adds username to req.user
    .post(authenticate)
    // Check if project exists and adds version or '-1' to req.currentVersion
    .post(projectLookup)
    // Checks that new version is higher than existing
    .post((req, res, next) => {
      console.log(req.newVersion)
      console.log(req.currentVersion)
      if (req.currentVersion.major == 0 &&
          req.currentVersion.minor == 0 &&
          req.currentVersion.patch == 0) {
        console.log('Package doesn\'t exist')
        next()
      } else {
        res.json('package already exists')
      }
    })
    // Parses and stores new file and adds uri to req
    .post((req, res) => {
      console.log('Parsing')
      let form = new formidable.IncomingForm()
      form.uploadDir = __dirname + '/../data/'
      form.keepExtensions = true
      form.parse(req, function(err, fields, files) {
        let path = files.file.path
        let archiveName = path.substring(path.lastIndexOf('upload'))
        req.archiveUri = 'data/' + archiveName
        addPackage(req)
        res.writeHead(200, {'content-type': 'text/plain'});
        res.write('received upload:\n\n');
        res.end(util.inspect({fields: fields, files: files}));
      });
    })

    .put((req, res, next) => {
      console.log('/projects hit with put request')
      next()
    })
    .put(authenticate)
    .put(projectLookup)
    .put((req, res, next) => {
      console.log(req.newVersion)
      console.log(req.currentVersion)
      if (req.newVersion.major <= req.currentVersion.major) {
        if (req.newVersion.minor <= req.currentVersion.minor) {
          if(req.newVersion.patch <= req.currentVersion.patch) {
            return res.json('Update rejected: needs newer version number')
          }
        }
      }
      console.log('okay to update')
      next()
    })
    .put((req, res) => {
      console.log('Parsing')
      let form = new formidable.IncomingForm()
      form.uploadDir = __dirname + '/../data/'
      form.keepExtensions = true
      form.parse(req, function(err, fields, files) {
        let path = files.file.path
        let archiveName = path.substring(path.lastIndexOf('upload'))
        req.archiveUri = 'data/' + archiveName
        updatePackage(req)
        res.writeHead(200, {'content-type': 'text/plain'});
        res.write('received upload:\n\n');
        res.end(util.inspect({fields: fields, files: files}));
      });
    })}
