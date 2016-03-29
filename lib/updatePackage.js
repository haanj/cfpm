'use strict'

module.exports = (req) => {
  let Archive = require('../models/archive_module')
  let Version = require('../models/version_module')
  let Project = require('../models/project_module')

  function addArchive(req) {
    let newArchive = new Archive({ uri: req.archiveUri })
    newArchive.save()
      .then((archive) => {
        req.newArchive_id = archive._id
        addVersion(req)
      })
  }

  function addVersion(req) {
    let newVersion = new Version({
      major: req.newVersion.major,
      minor: req.newVersion.minor,
      patch: req.newVersion.patch,
      archive: req.newArchive_id
    })

    newVersion.save()
      .then((version) => {
        req.newVersion_id = version._id
        updateProject(req)
      })
  }

  function updateProject(req) {
    Project.findOne({projectName: req.projectName})
      .then((project) => {
        console.log('old project:\n', project)
        project.current = req.newVersion_id
        project.versions.push(req.newVersion_id)
        project.save()
          .then((project) => {
            console.log('project updated:\n', project)
          })
      })
  }

  addArchive(req)
}
