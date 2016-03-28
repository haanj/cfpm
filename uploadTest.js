'use strict'
let fs = require('fs')
let request = require('superagent')
let TOKEN = process.env.TOKEN
let url = 'localhost:3000'
let archiver = require('archiver')

function uploadFile(path) {
  // fs.createReadStream(path)
  //   .pipe(
  //     request
  //       .post(url + '/projects')
  //       .set('authorization', 'token ' + TOKEN)
  //       .set('projectname', 'testproject-name')
  //       .set('author', 'haanj')
  //       .set('filename', process.argv[2])
  //   )

  request
    .post(url + '/projects')
    .set('authorization', 'token ' + TOKEN)
    .set('projectname', 'testproject-name')
    .set('author', 'haanj')
    .set('filename', path)
    .attach('file', path)
    .end((err, res) => {
      console.log(res.body)
      fs.unlink(path, () => {
        console.log('upload complete')
      })
    })
}

function archiveDirectory(directory) {
  let output = fs.createWriteStream('target.zip')
  let archive = archiver.create('zip')
  archive.pipe(output)
  archive.directory(directory)
  archive.finalize()

  output.on('close', () => {
    uploadFile('target.zip')
  })
}

archiveDirectory('./project')

// uploadFile(__dirname + '/' + process.argv[2])
