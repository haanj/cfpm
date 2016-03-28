'use strict'
let fs = require('fs')
let request = require('superagent')
let TOKEN = process.env.TOKEN
let url = 'localhost:3000'

function readFile(path) {
  // fs.readFile(path, (err, fileData) => {
  //   if (err) throw err
  //   console.log(fileData)
  //   postFile(path, fileData)
  // });
  fs.createReadStream(path)
    .pipe(
      request
        .post(url + '/projects')
        .set('authorization', 'token ' + TOKEN)
        .set('projectname', 'testproject-name')
        .set('author', 'haanj')
        .set('filename', process.argv[2])
    )
}


function postFile(path, fileData) {
  request
    .post(url + '/projects')
    .set('authorization', 'token ' + TOKEN)
    .set('projectname', 'testproject-name')
    .set('author', 'haanj')
    .set('filename', process.argv[2])
    .send(fileData)
    .end((err, res)=> {
      console.log(err)
    })
}

readFile(__dirname + '/' + process.argv[2])
