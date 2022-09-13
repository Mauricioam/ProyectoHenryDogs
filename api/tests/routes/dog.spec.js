/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);


describe('Dog routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
   
});

describe('/api/dogs', function() {
  it('GET respond with a status 200', function(){
    return agent
      .get('/api/dogs')
      .expect(function(res){
        expect(res.status).equal(200)})
  });
})
