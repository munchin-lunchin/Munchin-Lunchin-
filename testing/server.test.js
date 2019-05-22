const request = require('supertest');
const server = 'http://localhost:3000'
const app = require('../server/server');


describe('verifyUser', () => {
  describe('/', () => {
    describe('/login', () => {
      it('responds with 200 status and text/html content type', () => {
        return request(app)
          .post('/login')
          .expect('Content-Type', /application\/json/)
          .expect(200);      
      })
    });
  });
});

describe('searchYelp', () => {
    describe('GET', () => {
      it('responds with an empty json object if name/zip are undefined', () => {
        return request(app)
          .get(`/yelp/restaurantName//restaurantZip/10021`)
          .expect(404);
      })
    });

      it('responds with an object containing all restaurants and locations', () => {
        return request(app)
          .get('/yelp/restaurantName/chipotle/restaurantZip/10021')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200)
          .then(data => {
            expect(data.length > 1);
          });
      });
})
