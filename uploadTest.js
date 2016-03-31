'use strict'
let fs = require('fs')
let request = require('superagent')
let TOKEN = process.env.TOKEN
let url = 'localhost:3000'
let archiver = require('archiver')

function uploadFile(path) {
  request
    .put(url + '/projects')
    .set('authorization', 'token ' + TOKEN)
    .set('projectname', 'testproject-four')
    .set('version', '1.13.14')
    .attach('file', path)
    .end((err, res) => {
      console.log(res.body)
      if (err) return console.log('upload unsuccessful:')
      fs.unlink(path, ()   => {
        console.log('fin')
      })
    })
}

function archiveDirectory(directory) {
  let output = fs.createWriteStream('target.zip')
  let archive = archiver.create('zip')
  archive.pipe(output)
  archive.directory(directory, '')
  archive.finalize()

  output.on('close', () => {
    uploadFile('target.zip')
  })
}

archiveDirectory(process.cwd() + '/project')
