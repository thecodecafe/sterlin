require('../../configs/dotenv');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../stubs/run-app.fn');
const mockingoose = require('mockingoose').default;
const SeasonModel = require('../../app/models/Season.model');
const UserModel = require('../../app/models/User.model');
const { userDoc } = require('../stubs/mock-date.user');
const { seasonDoc } = require('../stubs/mock-data.season');
const { validSeasonList, validSeasonCreate, inValidSeasonCreate, validSeasonUpdate, inValidSeasonUpdate } = require('../stubs/mock-request.season');
const { createToken } = require('../../utils/Token.util');
app.use('/seasons', require('../../routes/Seasons'));

describe('<SeasonsRoute.List>', () => {
  it('should return a list of users', () => {
    mockingoose(SeasonModel).toReturn([seasonDoc], 'find');
    return request(app)
      .get('/seasons')
      .query(validSeasonList.body)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(({body}) => {
        expect(body).toBeDefined();
        expect(body.success).toBe(true);
        expect(body.data).toBeDefined();
        expect(body.data[0]).toBeDefined();
        expect(body.data[0].name).toBeDefined();
        expect(body.data[0].startDate).toBeDefined();
        expect(body.data[0].endDate).toBeDefined();
      })
  });
  
  it('should return a single season', () => {
    mockingoose(SeasonModel).toReturn(seasonDoc, 'findOne');
    return request(app)
      .get('/seasons/' + seasonDoc._id)
      .query(validSeasonList.body)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(({body}) => {
        expect(body).toBeDefined();
        expect(body.success).toBe(true);
        expect(body.data).toBeDefined();
        expect(body.data.name).toBeDefined();
        expect(body.data.startDate).toBeDefined();
        expect(body.data.endDate).toBeDefined();
      })
  });
  
  it('should fail to return a single season', () => {
    mockingoose(SeasonModel).toReturn(null, 'findOne');
    return request(app)
      .get('/seasons/' + seasonDoc._id)
      .query(validSeasonList.body)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .then(({body}) => {
        expect(body).toBeDefined();
        expect(body.success).toBe(false);
        expect(body.data).toBeUndefined();
        expect(body.message).toBeDefined();
        expect(body.message).toMatch(/not found/i);
      })
  });

  afterEach(() => mockingoose(SeasonModel).reset())
});

describe('<SeasonsRoute.Create>', () => {
  it('should create a season', () => {
    mockingoose(SeasonModel).toReturn(0, 'count');
    mockingoose(SeasonModel).toReturn(seasonDoc, 'save');
    mockingoose(UserModel).toReturn(userDoc, 'findOne');
    const token = createToken({id: new mongoose.Types.ObjectId()});
    return request(app)
      .post('/seasons')
      .send(validSeasonCreate.body)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer '+token)
      .expect('Content-Type', /json/)
      .expect(201)
      .then(({body}) => {
        expect(body).toBeDefined();
        expect(body.success).toBe(true);
        expect(body.data).toBeDefined();
        expect(body.data.name).toBeDefined();
        expect(body.data.startDate).toBeDefined();
        expect(body.data.endDate).toBeDefined();
      })
  });

  it('should fail to create a season', () => {
    mockingoose(SeasonModel).toReturn(0, 'count');
    mockingoose(UserModel).toReturn(userDoc, 'findOne');
    const token = createToken({id: new mongoose.Types.ObjectId()});
    return request(app)
      .post('/seasons')
      .send(inValidSeasonCreate.body)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer '+token)
      .expect('Content-Type', /json/)
      .expect(422)
      .then(({body}) => {
        expect(body).toBeDefined();
        expect(body.success).toBe(false);
        expect(body.data).toBeUndefined();
        expect(body.meta).toBeDefined();
        expect(body.meta.errors).toBeDefined();
        expect(body.meta.errors.startDate).toBeDefined();
        expect(body.meta.errors.endDate).toBeDefined();
        expect(body.meta.errors.name).toBeUndefined();
      })
  });

  it('should fail for when season already exists', () => {
    mockingoose(SeasonModel).toReturn(1, 'count');
    mockingoose(UserModel).toReturn(userDoc, 'findOne');
    const token = createToken({id: new mongoose.Types.ObjectId()});
    return request(app)
      .post('/seasons')
      .send(validSeasonCreate.body)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer '+token)
      .expect('Content-Type', /json/)
      .expect(422)
      .then(({body}) => {
        expect(body).toBeDefined();
        expect(body.success).toBe(false);
        expect(body.data).toBeUndefined();
        expect(body.meta).toBeDefined();
        expect(body.meta.errors).toBeDefined();
        expect(body.meta.errors.startDate).toBeUndefined();
        expect(body.meta.errors.endDate).toBeUndefined();
        expect(body.meta.errors.name).toBeDefined();
      })
  });

  it('should fail if user is not logged in', () => {
    return request(app)
      .post('/seasons')
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

  it('should fail for user does not have permission', () => {
    mockingoose(UserModel).toReturn({...userDoc, role: 'user'}, 'findOne');
    const token = createToken({id: new mongoose.Types.ObjectId()});
    return request(app)
      .post('/seasons')
      .send(validSeasonCreate.body)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer '+token)
      .expect('Content-Type', /json/)
      .expect(401)
      .then(({body}) => {
        expect(body).toBeDefined();
        expect(body.success).toBe(false);
        expect(body.data).toBeUndefined();
        expect(body.message).toMatch(/denied/i);
      })
  });

  afterEach(() => mockingoose(SeasonModel).reset())
});

describe('<SeasonsRoute.Update>', () => {
  let token;
  beforeAll(() => {
    token = createToken({id: new mongoose.Types.ObjectId()});
  });

  it('should update a season', () => {
    mockingoose(SeasonModel).toReturn(0, 'count');
    mockingoose(SeasonModel).toReturn(seasonDoc, 'findOne');
    mockingoose(SeasonModel).toReturn(seasonDoc, 'save');
    mockingoose(UserModel).toReturn(userDoc, 'findOne');
    return request(app)
      .put('/seasons/' + seasonDoc._id)
      .send(validSeasonUpdate.body)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer '+token)
      .expect('Content-Type', /json/)
      .expect(200)
      .then(({body}) => {
        expect(body).toBeDefined();
        expect(body.success).toBe(true);
        expect(body.data).toBeDefined();
        expect(body.data.name).toBeDefined();
        expect(body.data.startDate).toBeDefined();
        expect(body.data.endDate).toBeDefined();
      })
  });

  it('should fail to update a season', () => {
    mockingoose(SeasonModel).toReturn(0, 'count');
    mockingoose(UserModel).toReturn(userDoc, 'findOne');
    return request(app)
      .put('/seasons/' + seasonDoc._id)
      .send(inValidSeasonUpdate.body)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer '+token)
      .expect('Content-Type', /json/)
      .expect(422)
      .then(({body}) => {
        expect(body).toBeDefined();
        expect(body.success).toBe(false);
        expect(body.data).toBeUndefined();
        expect(body.meta).toBeDefined();
        expect(body.meta.errors).toBeDefined();
        expect(body.meta.errors.startDate).toBeDefined();
        expect(body.meta.errors.endDate).toBeDefined();
        expect(body.meta.errors.name).toBeUndefined();
      })
  });

  it('should fail for when season already exists', () => {
    mockingoose(SeasonModel).toReturn(1, 'count');
    mockingoose(UserModel).toReturn(userDoc, 'findOne');
    return request(app)
      .put('/seasons/' + seasonDoc._id)
      .send(validSeasonUpdate.body)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer '+token)
      .expect('Content-Type', /json/)
      .expect(422)
      .then(({body}) => {
        expect(body).toBeDefined();
        expect(body.success).toBe(false);
        expect(body.data).toBeUndefined();
        expect(body.meta).toBeDefined();
        expect(body.meta.errors).toBeDefined();
        expect(body.meta.errors.name).toBeDefined();
      })
  });

  it('should fail for invalid season ID', () => {
    mockingoose(SeasonModel).toReturn(0, 'count');
    mockingoose(SeasonModel).toReturn(null, 'findOne');
    mockingoose(UserModel).toReturn(userDoc, 'findOne');
    return request(app)
      .put('/seasons/' + seasonDoc._id)
      .send(validSeasonUpdate.body)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer '+token)
      .expect('Content-Type', /json/)
      .expect(400)
      .then(({body}) => {
        expect(body).toBeDefined();
        expect(body.success).toBe(false);
        expect(body.data).toBeUndefined();
        expect(body.message).toMatch(/not found/i);
      })
  });

  it('should fail if user is not logged in', () => {
    return request(app)
      .put('/seasons/' + seasonDoc._id)
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

  it('should fail for user does not have permission', () => {
    mockingoose(UserModel).toReturn({...userDoc, role: 'user'}, 'findOne');
    return request(app)
      .post('/seasons')
      .send(validSeasonUpdate.body)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer '+token)
      .expect('Content-Type', /json/)
      .expect(401)
      .then(({body}) => {
        expect(body).toBeDefined();
        expect(body.success).toBe(false);
        expect(body.data).toBeUndefined();
        expect(body.message).toMatch(/denied/i);
      })
  });

  afterEach(() => mockingoose(SeasonModel).reset())
});

describe('<SeasonsRoute.Delete>', () => {
  let token;
  beforeAll(() => {
    token = createToken({id: new mongoose.Types.ObjectId()});
  });

  it('should delete a season', () => {
    mockingoose(SeasonModel).toReturn(seasonDoc, 'findOne');
    mockingoose(SeasonModel).toReturn({deletedCount: 1}, 'delete');
    mockingoose(UserModel).toReturn(userDoc, 'findOne');
    return request(app)
      .delete('/seasons/' + seasonDoc._id)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer '+token)
      .expect('Content-Type', /json/)
      .expect(200)
      .then(({body}) => {
        expect(body).toBeDefined();
        expect(body.success).toBe(true);
        expect(body.message).toMatch(/deleted/i);
      })
  });

  it('should fail for invalid season ID', () => {
    mockingoose(SeasonModel).toReturn(null, 'findOne');
    mockingoose(UserModel).toReturn(userDoc, 'findOne');
    return request(app)
      .delete('/seasons/' + seasonDoc._id)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer '+token)
      .expect('Content-Type', /json/)
      .expect(400)
      .then(({body}) => {
        expect(body).toBeDefined();
        expect(body.success).toBe(false);
        expect(body.data).toBeUndefined();
        expect(body.message).toMatch(/not found/i);
      })
  });

  it('should fail if user is not logged in', () => {
    return request(app)
      .delete('/seasons/' + seasonDoc._id)
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

  it('should fail for user does not have permission', () => {
    mockingoose(UserModel).toReturn({...userDoc, role: 'user'}, 'findOne');
    return request(app)
      .delete('/seasons/' + seasonDoc._id)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer '+token)
      .expect('Content-Type', /json/)
      .expect(401)
      .then(({body}) => {
        expect(body).toBeDefined();
        expect(body.success).toBe(false);
        expect(body.data).toBeUndefined();
        expect(body.message).toMatch(/denied/i);
      })
  });

  afterEach(() => mockingoose(SeasonModel).reset())
});