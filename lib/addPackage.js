'use strict'

module.exports = (req) => {
  let Archive = require('../models/archive_module')
  let Version = require('../models/version_module')
  let Project = require('../models/project_module')

  function addArchive(req) {
    let newArchive = new Archive({ uri: req.archiveUri })
    newArchive.save()
      .then((archive) => {
        console.log(archive)
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
        console.log(version)
        req.newVersion_id = version._id
        addProject(req)
      })
  }

  function addProject(req) {
    let newProject = new Project({
      projectName: req.projectName,
      author: req.user._id,
      versions: [req.newVersion_id],
      current: req.newVersion_id
    })

    newProject.save()
      .then((project) => {
        console.log(project)
      })
  }

  addArchive(req)
}
