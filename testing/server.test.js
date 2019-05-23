const request = require('supertest');
const app = require('../server/server');


describe('verifyUser', () => {
  describe('/', () => {
    describe('/login', () => {
      it('responds with 200 status and application/json', () => {
        return request(app)
          .post('/login')
          .expect('Content-Type', /application\/json/)
          .expect(200);      
      })
    });
  });
});

describe('GET request to yelp API', () => {
    describe('yelpController.searchYelp', () => {
      it('responds with a 404 if name param is missing in request', () => {
        return request(app)
          .get(`/yelp/restaurantName//restaurantZip/10021`)
          .expect(404);
      })
    });

    describe('yelpController.searchYelp', () => {
      it('responds with a 404 if zip param is missing in request', () => {
        return request(app)
          .get(`/yelp/restaurantName/Chipotle/restaurantZip/`)
          .expect(404);
      })
    });

  it('responds with 200 status code, and a record containing the name they searched for', () => {
    return request(app)
      .get('/yelp/restaurantName/chipotle/restaurantZip/10021')
      .expect(200)
      .then(data => {
        expect(data.body[0].name).toMatch(/chipotle/i);
      });
  });
})
