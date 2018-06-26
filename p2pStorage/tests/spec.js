var request = require('supertest');
var chai = require('chai');
var expect = chai.expect;
require('../bin/www');
var server = require('../app')
describe('API Tests', function () {

  it('Checking data Post service', function testPostService(done) {
    request(server)
      .post('/')
      .send({"abc":"abc"})
      .expect(200, done);
  });
  it('Checking data fet service', function testGetService(done) {
    request(server)
      .get('/')
      .end(function(err, res) {
        expect(res.text).to.be.equal(JSON.stringify({"abc":"abc"}));
        expect(res.statusCode).to.be.equal(200);
        done();
      })
  });

});
