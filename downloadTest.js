'use strict'
let fs = require('fs')
let request = require('superagent')
// let TOKEN = process.env.TOKEN
let url = 'localhost:3000'
let unzip = require('unzip')

function downloadCurrent(directory) {
  console.log(directory)
  request
    .get(url + '/projects')
    .set('projectname', 'testproject-three')
    .buffer(true)
    .parse(binaryParser)
    .end(function(err, res) {
      if (err) return console.log('download unsuccessful')
      console.log(res.headers)
      console.log('res=', res.body)
      fs.writeFile('archive.zip', res.body, (err) => {
        if (err) throw err
        console.log('writing complete')
        unpackage(directory)
      })
    })
}
// http://stackoverflow.com/questions/13573315/read-response-output-buffer-stream-with-supertest-superagent-on-node-js-server
function binaryParser(res, callback) {
  res.setEncoding('binary')
  res.data = ''
  res.on('data', function (chunk) {
    res.data += chunk
  })
  res.on('end', function () {
    callback(null, new Buffer(res.data, 'binary'))
  })
}

function unpackage(directory) {
  fs.createReadStream('archive.zip')
  .pipe(
    unzip
      .Extract({ path: directory })
        .on('close', () => {
          console.log('unzipped')
          fs.unlink('archive.zip', () => {
            console.log('fin')
          })
        })
    )
}

downloadCurrent(process.cwd())
