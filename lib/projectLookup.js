'use strict'

module.exports = (req, res, next) => {
  let data = req.headers
  req.projectName = data.projectname
  let Project = require('../models/project_module')
  Project.findOne({projectName: req.projectName})
    .populate('current')
    .populate('versions')
    .populate('author')
    .then((project) => {
      // TODO: clean up and reorganize how info is stored on req body
      // TODO: currentVersion is now a misnomer as it could now potentially be a requested version
      // parses requested version if exists
      if(req.headers.version) {
        let newVersion = req.headers.version.split('.')
        req.newVersion = {
          major: parseInt(newVersion[0]),
          minor: parseInt(newVersion[1]),
          patch: parseInt(newVersion[2])
        }

        if (project) {
          req.currentAuthor = project.author.userName
          req.currentVersion = project.current
          // checks if requested version exists in database and adds it
          // req.currentVersion if it does exist
          project.versions.forEach((version) => {
            if (version.major === req.newVersion.major &&
              version.minor == req.newVersion.minor &&
              version.patch == req.newVersion.patch)
            {
              req.currentVersion = version
            }
          })
        }
      }

      if (!project) {
        req.currentVersion = {
          major: 0,
          minor: 0,
          patch: 0
        }
      }
      next()
    })
    .catch(err => {
      console.log(err)
      res.status(400).json({msg: err})
    })
}
