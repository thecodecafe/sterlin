require('../../configs/dotenv');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../stubs/run-app.fn');
const mockingoose = require('mockingoose').default;
const FixtureModel = require('../../app/models/Fixture.model');
const TeamModel = require('../../app/models/Team.model');
const SeasonModel = require('../../app/models/Season.model');
const UserModel = require('../../app/models/User.model');
const { userDoc } = require('../stubs/mock-date.user');
const { fixtureDoc, newfixtureDoc } = require('../stubs/mock-data.fixture');
const {
  fixtureList,
  validFixtureCreate,
  inValidFixtureCreate,
  validFixtureUpdate,
  inValidFixtureUpdate
} = require('../stubs/mock-request.fixture');
const { createToken } = require('../../utils/Token.util');
app.use('/fixtures', require('../../routes/Fixtures'));

describe('<FixturesRoute.List>', () => {
  it('should return a list of users', () => {
    mockingoose(FixtureModel).toReturn([newfixtureDoc], 'find');
    return request(app)
      .get('/fixtures')
      .query(fixtureList.query)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(({body}) => {
        expect(body).toBeDefined();
        expect(body.success).toBe(true);
        expect(body.data).toBeDefined();
        expect(body.data[0]).toBeDefined();
        expect(body.data[0].season).toBeDefined();
        expect(body.data[0].homeTeam).toBeDefined();
        expect(body.data[0].awayTeam).toBeDefined();
        expect(body.data[0].startsAt).toBeDefined();
        expect(body.data[0].endsAt).toBeDefined();
        expect(body.data[0].homeGoals).toBeDefined();
        expect(body.data[0].awayGoals).toBeDefined();
      })
  });
  
  it('should return a single fixture', () => {
    mockingoose(FixtureModel).toReturn(newfixtureDoc, 'findOne');
    return request(app)
      .get('/fixtures/' + newfixtureDoc._id)
      .query(fixtureList.query)
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
        expect(body.data.startsAt).toBeDefined();
        expect(body.data.endsAt).toBeDefined();
        expect(body.data.homeGoals).toBeDefined();
        expect(body.data.awayGoals).toBeDefined();
      })
  });
  
  it('should fail to return a single fixture', () => {
    mockingoose(FixtureModel).toReturn(null, 'findOne');
    return request(app)
      .get('/fixtures/' + newfixtureDoc._id)
      .query(fixtureList.query)
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

  afterEach(() => mockingoose(FixtureModel).reset())
});

describe('<FixturesRoute.Create>', () => {
  beforeAll(() => {
    mockingoose(SeasonModel).toReturn(1, 'count');
  })
  it('should create a fixture', () => {
    mockingoose(FixtureModel).toReturn(newfixtureDoc, 'save');
    mockingoose(UserModel).toReturn(userDoc, 'findOne');
    mockingoose(TeamModel).toReturn(1, 'count');
    const token = createToken({id: new mongoose.Types.ObjectId()});
    return request(app)
      .post('/fixtures')
      .send(validFixtureCreate.body)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer '+token)
      .expect('Content-Type', /json/)
      .expect(201)
      .then(({body}) => {
        expect(body).toBeDefined();
        expect(body.success).toBe(true);
        expect(body.data).toBeDefined();
        expect(body.data.season).toBeDefined();
        expect(body.data.homeTeam).toBeDefined();
        expect(body.data.awayTeam).toBeDefined();
        expect(body.data.startsAt).toBeDefined();
        expect(body.data.endsAt).toBeDefined();
        expect(body.data.homeGoals).toBeDefined();
        expect(body.data.awayGoals).toBeDefined();
      })
  });

  it('should fail to create a fixture', () => {
    mockingoose(UserModel).toReturn(userDoc, 'findOne');
    const token = createToken({id: new mongoose.Types.ObjectId()});
    return request(app)
      .post('/fixtures')
      .send(inValidFixtureCreate.body)
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
        expect(body.meta.errors.startsAt).toBeDefined();
        expect(body.meta.errors.homeTeam).toBeUndefined();
        expect(body.meta.errors.awayTeam).toBeUndefined();
      })
  });

  it('should fail for when season is invalid', () => {
    mockingoose(SeasonModel).toReturn(0, 'count');
    mockingoose(UserModel).toReturn(userDoc, 'findOne');
    const token = createToken({id: new mongoose.Types.ObjectId()});
    return request(app)
      .post('/fixtures')
      .send(validFixtureCreate.body)
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
        expect(body.meta.errors.season).toBeDefined();
      })
  });

  it('should fail to create if home and away team are same', () => {
    mockingoose(SeasonModel).toReturn(0, 'count');
    mockingoose(UserModel).toReturn(userDoc, 'findOne');
    const token = createToken({id: new mongoose.Types.ObjectId()});
    return request(app)
      .post('/fixtures')
      .send({
        ...validFixtureCreate.body,
        awayTeam: validFixtureCreate.body.homeTeam
      })
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
        expect(body.meta.errors.awayTeam).toBeDefined();
        expect(body.meta.errors.homeTeam).toBeDefined();
      })
  });

  it('should fail if user is not logged in', () => {
    return request(app)
      .post('/fixtures')
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
      .post('/fixtures')
      .send(validFixtureCreate.body)
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

  afterEach(() => mockingoose(FixtureModel).reset())
});

describe('<FixturesRoute.Update>', () => {
  let token;
  beforeAll(() => {
    token = createToken({id: new mongoose.Types.ObjectId()});
  });

  it('should update a fixture', () => {
    mockingoose(FixtureModel).toReturn(newfixtureDoc, 'findOne');
    mockingoose(FixtureModel).toReturn(newfixtureDoc, 'save');
    mockingoose(UserModel).toReturn(userDoc, 'findOne');
    mockingoose(SeasonModel).toReturn(1, 'count')
    return request(app)
      .put('/fixtures/' + newfixtureDoc._id)
      .send(validFixtureUpdate.body)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer '+token)
      .expect('Content-Type', /json/)
      .expect(200)
      .then(({body}) => {
        expect(body).toBeDefined();
        expect(body.success).toBe(true);
        expect(body.data).toBeDefined();
        expect(body.data.season).toBeDefined();
        expect(body.data.homeTeam).toBeDefined();
        expect(body.data.awayTeam).toBeDefined();
        expect(body.data.startsAt).toBeDefined();
        expect(body.data.endsAt).toBeDefined();
        expect(body.data.homeGoals).toBeDefined();
        expect(body.data.awayGoals).toBeDefined();
      })
  });

  it('should fail to update a fixture', () => {
    mockingoose(UserModel).toReturn(userDoc, 'findOne');
    return request(app)
      .put('/fixtures/' + newfixtureDoc._id)
      .send(inValidFixtureUpdate.body)
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
        expect(body.meta.errors.startsAt).toBeDefined();
        expect(body.meta.errors.homeTeam).toBeDefined();
        expect(body.meta.errors.awayTeam).toBeDefined();
      })
  });

  it('should fail for invalid fixture ID', () => {
    mockingoose(FixtureModel).toReturn(null, 'findOne');
    mockingoose(UserModel).toReturn(userDoc, 'findOne');
    return request(app)
      .put('/fixtures/' + newfixtureDoc._id)
      .send(validFixtureUpdate.body)
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
      .put('/fixtures/' + newfixtureDoc._id)
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
      .post('/fixtures')
      .send(validFixtureUpdate.body)
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

  afterEach(() => mockingoose(FixtureModel).reset())
});

describe('<FixturesRoute.Delete>', () => {
  let token;
  beforeAll(() => {
    token = createToken({id: new mongoose.Types.ObjectId()});
  });

  it('should delete a fixture', () => {
    mockingoose(FixtureModel).toReturn(fixtureDoc, 'findOne');
    mockingoose(FixtureModel).toReturn({deletedCount: 1}, 'delete');
    mockingoose(UserModel).toReturn(userDoc, 'findOne');
    return request(app)
      .delete('/fixtures/' + newfixtureDoc._id)
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

  it('should fail for invalid fixture ID', () => {
    mockingoose(FixtureModel).toReturn(null, 'findOne');
    mockingoose(UserModel).toReturn(userDoc, 'findOne');
    return request(app)
      .delete('/fixtures/' + newfixtureDoc._id)
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
      .delete('/fixtures/' + newfixtureDoc._id)
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
      .delete('/fixtures/' + newfixtureDoc._id)
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

  afterEach(() => mockingoose(FixtureModel).reset())
});