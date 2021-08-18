/* eslint-disable import/no-extraneous-dependencies */

const { expect } = require("chai")
const session = require("supertest-session")
const app = require("../../src/app")
const { Country, Activity, conn } = require("../../src/db")

const agent = session(app)

describe("Countries routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("No se pudo conectar a la base de datos", err)
    })
  )

  describe('/countries', function() {
    it('GET responde con un status 200 en countries', function(){
      return agent
        .get('/countries')
        .expect(function(res){
          expect(res.status).equal(200)})
    });
    it('GET responde con un status 200 en activities', function(){
      return agent
        .get('/activities')
        .expect(function(res){
          expect(res.status).equal(200)})
    });
    it('GET responde con un status 200 en activities', function(){
      return agent
        .post('/activities', )
        .expect(function(res){
          expect(res.status).equal(200)})
    });
  })
});