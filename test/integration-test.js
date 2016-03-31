// TODO: inject mock database to test more routes
'use strict'
let chai = require('chai')
let chaiHTTP = require('chai-http')
chai.use(chaiHTTP)
let request = chai.request
let expect = chai.expect
var TOKEN
TOKEN // linter thought TOKEN was never being used
let S_PORT = Number(process.env.S_PORT) || require('../.config').S_PORT
let server = 'localhost:' + S_PORT
// let DB_PORT = require('../.config').DB_PORT;

describe('tests /login route', function() {
  it('should respond with \'Hello world\' with get to /login', (done) => {
    request(server)
      .get('/login')
      .end((err, res) => {
        expect(err).to.not.eql('null')
        expect(res.body).to.eql('Hello world')
        done()
      })
  })
})

describe('tests /login route', function() {
  this.timeout(0) // due to latency with mongodb
  it('should return errors with incorrect authorization', (done) => {
    request(server)
      .post('/login')
      .end((err, res) => {
        expect(err)
        expect(res.text).to.be.eql('{"status":"failure"}')
      })
    request(server)
      .post('/login')
      .auth('idontexist', 'password')
      .end((err, res) => {
        expect(err)
        expect(res.text).to.be.eql('{"status":"failure"}')
      })
    request(server)
      .post('/login')
      .auth('haanj', 'wrongpassword')
      .end((err, res) => {
        expect(err)
        expect(res.text).to.be.eql('{"status":"failure"}')
        done()
      })
  })


  it('should respond with token with correct authorization', (done) => {
    request(server)
      .post('/login')
      .auth('haanj', 'password123')
      .end((err, res) => {
        expect(err).to.not.eql('null')
        expect(res.body).to.have.property('token')
        TOKEN = res.body.token
        done()
      })
  })
})

describe('tests /projects post route', function () {
  this.timeout(0) // due to latency with mongodb
  it('should return errors with incorrect authorization', (done) => {
    request(server)
      .post('/projects')
      .end((err, res) => {
        expect(err)
        expect(res.text).to.be.eql('{"msg":"authentication error"}')
      })
    request(server)
      .post('/projects')
      .auth('haanj', 'password123')
      .end((err, res) => {
        expect(err)
        expect(res.text).to.be.eql('{"msg":"authentication error"}')
      })
    request(server)
      .post('/projects')
      .set('authorization', 'token wrongtoken')
      .end((err, res) => {
        expect(err)
        expect(res.text).to.be.eql('{"msg":"authentication error"}')
        done()
      })
  })

  it('should return error without project specified', (done) => {
    request(server)
      .post('/projects')
      .set('authorization', `token ${TOKEN}`)
      .end((err, res) => {
        expect(err)
        expect(res.error.text).to.eql('{"msg":"Improper data stream"}')
        done()
      })
  })
})


describe('tests /projects put route', function () {
  this.timeout(0) // due to latency with mongodb
  it('should return errors with incorrect authorization', (done) => {
    request(server)
      .put('/projects')
      .end((err, res) => {
        expect(err)
        expect(res.text).to.be.eql('{"msg":"authentication error"}')
      })
    request(server)
      .put('/projects')
      .auth('haanj', 'password123')
      .end((err, res) => {
        expect(err)
        expect(res.text).to.be.eql('{"msg":"authentication error"}')
      })
    request(server)
      .put('/projects')
      .set('token', 'wrongtoken')
      .end((err, res) => {
        expect(err)
        expect(res.text).to.be.eql('{"msg":"authentication error"}')
        done()
      })
  })
})
