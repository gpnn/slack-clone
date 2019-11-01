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

describe('testing get route for channels list', () => {
  it('should return 200 status', () => {
    return request(app)
      .get('/channels')
      .then( (response) => {
        assert.equal(response.status, 200)
      })
  });
});

describe('testing get route for a non-existent channel id', () => {
  it('should return the 404 status', () => {
    let id = "idNotFound";
    return request(app)
      .get(`/channel/${id}`)
      .then((response) => {
        assert.equal(response.status, 404)
      })
  })
});
