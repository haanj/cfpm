'use strict'

module.exports = (req, res, next) => {
  let data = req.headers
  req.projectName = data.projectname
  let Project = require('../models/project_module')
  Project.findOne({projectName: req.projectName})
    .populate('current')
    .populate('author')
    .then((project) => {
      req.currentAuthor = project.author.userName

      // parses requested version if exists
      if(req.headers.version) {
        let newVersion = req.headers.version.split('.')
        req.newVersion = {
          major: parseInt(newVersion[0]),
          minor: parseInt(newVersion[1]),
          patch: parseInt(newVersion[2])
        }
      }

      if (!project) {
        req.currentVersion = {
          major: 0,
          minor: 0,
          patch: 0
        }
      } else {
        req.currentVersion = project.current
      }
      next()
    })
    .catch(err => {
      res.status(418).json({msg: err})
    })
}
