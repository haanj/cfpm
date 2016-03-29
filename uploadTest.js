'use strict'
let fs = require('fs')
let request = require('superagent')
let TOKEN = process.env.TOKEN
let url = 'localhost:3000'
let archiver = require('archiver')

function uploadFile(path) {
  request
    .post(url + '/projects')
    // .set('authorization', 'token ' + TOKEN)
    .set('projectname', 'testproject-name')
    .set('version', '0.1.10')
    .set('author', 'haanj')
    .set('filename', path)
    .attach('file', path)
    .end((err, res) => {
      console.log(res.body)
      if (err) return console.log('upload unsuccessful:')
      fs.unlink(path, () => {
        console.log('upload complete')
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
