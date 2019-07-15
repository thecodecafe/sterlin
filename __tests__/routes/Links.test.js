require('../../configs/dotenv');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../stubs/run-app.fn');
const mockingoose = require('mockingoose').default;
const FixtureModel = require('../../app/models/Fixture.model');
const UserModel = require('../../app/models/User.model');
const { userDoc } = require('../stubs/mock-date.user');
const { newfixtureDoc } = require('../stubs/mock-data.fixture');
const { createToken } = require('../../utils/Token.util');
const { encrypto, decrypto } = require('../../utils/Encryption.util');
app.use('/li', require('../../routes/Links'));
app.use('/fixtures', require('../../routes/Fixtures'));
app.use((req, res) => {
  return res.status(404).json({success: false, message: 'not found'});
});

describe('<LinkRoute.Create>', () => {
  it('should generate link and return for a fixture', () => {
    mockingoose(FixtureModel).toReturn(newfixtureDoc, 'findOne');
    mockingoose(UserModel).toReturn(userDoc, 'findOne');
    return request(app)
      .post('/fixtures/' + newfixtureDoc._id + '/generate-link')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + createToken({id: userDoc._id}))
      .expect('Content-Type', /json/)
      .expect(201)
      .then(({body}) => {
        expect(body).toBeDefined();
        expect(body.success).toBe(true);
        expect(body.data).toBeDefined();
        expect(body.data.link).toBeDefined();
        expect(typeof(body.data.link)).toBe('string');
      })
  });

  it('should fail if it can\'t find the fixture', () => {
    mockingoose(FixtureModel).toReturn(null, 'findOne');
    mockingoose(UserModel).toReturn(userDoc, 'findOne');
    return request(app)
      .post('/fixtures/' + newfixtureDoc._id + '/generate-link')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + createToken({id: userDoc._id}))
      .expect('Content-Type', /json/)
      .expect(404)
      .then(({body}) => {
        expect(body).toBeDefined();
        expect(body.success).toBe(false);
        expect(body.message).toMatch(/not found/i);
      })
  });

  it('should fail if user is not authenticated', () => {
    return request(app)
      .post('/fixtures/' + newfixtureDoc._id + '/generate-link')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(403)
      .then(({body}) => {
        expect(body).toBeDefined();
        expect(body.success).toBe(false);
        expect(body.message).toMatch(/authentication/i);
      })
  });

  it('should fail if user is not admin', () => {
    mockingoose(UserModel).toReturn({...userDoc, role: 'user'}, 'findOne');
    return request(app)
      .post('/fixtures/' + newfixtureDoc._id + '/generate-link')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + createToken({id: userDoc._id}))
      .expect('Content-Type', /json/)
      .expect(401)
      .then(({body}) => {
        expect(body).toBeDefined();
        expect(body.success).toBe(false);
        expect(body.message).toMatch(/denied/i);
      })
  });

  afterEach(() => mockingoose(FixtureModel).reset())
});

describe('<LinkRoute.Verify>', () => {
  it('should return the fixture associated with the link', () => {
    mockingoose(FixtureModel).toReturn(newfixtureDoc, 'findOne');
    return request(app)
      .get('/li/' + encrypto(newfixtureDoc._id))
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(({body}) => {
        expect(body).toBeDefined();
        expect(body.success).toBe(true);
        expect(body.data).toBeDefined();
        expect(body.data.season).toBeDefined();
        expect(body.data.homeTeam).toBeDefined();
        expect(body.data.awayTeam).toBeDefined();
      })
  });

  it('should return 404 if code is not passed', () => {
    mockingoose(FixtureModel).toReturn(null, 'findOne');
    return request(app)
      .get('/li')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .then(({body}) => {
        expect(body).toBeDefined();
        expect(body.success).toBe(false);
        expect(body.message).toMatch(/not found/i);
      })
  });

  it('should fail if code cannot be decrypted', () => {
    return request(app)
      .get('/li/code')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then(({body}) => {
        expect(body).toBeDefined();
        expect(body.success).toBe(false);
        expect(body.message).toMatch(/invalid/i);
      })
  });

  it('should fail if fixture was not found', () => {
    mockingoose(FixtureModel).toReturn(null, 'findOne');
    return request(app)
      .post('/li/' + encrypto(newfixtureDoc._id))
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .then(({body}) => {
        expect(body).toBeDefined();
        expect(body.success).toBe(false);
        expect(body.message).toMatch(/not found/i);
      })
  });

  afterEach(() => mockingoose(FixtureModel).reset())
});