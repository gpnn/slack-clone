const app = require('../server');
const users = require('../controllers/users.controller.js');
let mocha = require('mocha');
let describe = mocha.describe;
const chai = require('chai')

chai.use(require('chai-http'));
chai.should();

const assert = require('assert');
const expect = require('chai').expect;
const should = require('chai').should;
const request = require('supertest');

describe('check if string is a string', () => {

  // beforeEach( () => {
  // });

  it('should be a string', () => {
    expect('string').to.be.a('string');
  });

});

describe('unit testing the users list', function () {

  it('should return OK status', function () {
    return request(app)
      .get('/users')
      .then(function (response) {
        assert.equal(response.status, 200)
      })
  });
});
