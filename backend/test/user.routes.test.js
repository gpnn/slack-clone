const app = require('../server');
let mocha = require('mocha');
let describe = mocha.describe;
const chai = require('chai')

chai.use(require('chai-http'));
chai.should();

const assert = require('assert');
const expect = require('chai').expect;
const should = require('chai').should;
const request = require('supertest');

describe('testing get route for users list', () => {
  it('should return 200 status', () => {
    return request(app)
      .get('/users')
      .then( (response) => {
        assert.equal(response.status, 200)
      })
  });
});

describe('testing get route for a non-existent user id', () => {
  it('should return the 404 status', () => {
    let id = "idNotFound";
    return request(app)
      .get(`/users/${id}`)
      .then((response) => {
        assert.equal(response.status, 404)
      })
  })
});

describe('testing get route for a non-existent user name', () => {
  it('should return the 200 status', () => {
    let username = "nameNotFound";
    return request(app)
      .get(`/users/username/${username}`)
      .then((response) => {
        assert.equal(response.status, 200)
      })
  })
});

