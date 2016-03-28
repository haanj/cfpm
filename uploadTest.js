'use strict'
let fs = require('fs')
let request = require('superagent')
let TOKEN = process.env.TOKEN
let url = 'localhost:3000'

function readFile(path) {
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
    .set('filename', process.argv[2])
    .attach('file', process.argv[2])
    .attach('file', 'testDocument.txt')
    .end((err, res) => {
      console.log(res.body)
    })
}

readFile(__dirname + '/' + process.argv[2])
