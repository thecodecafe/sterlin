require('../../configs/dotenv');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../stubs/run-app.fn');
const mockingoose = require('mockingoose').default;
const TeamModel = require('../../app/models/Team.model');
const UserModel = require('../../app/models/User.model');
const { userDoc } = require('../stubs/mock-date.user');
const { teamDoc } = require('../stubs/mock-data.team');
const { validTeamList, validTeamCreate, inValidTeamCreate, validTeamUpdate, inValidTeamUpdate } = require('../stubs/mock-request.team');
const { createToken } = require('../../utils/Token.util');
app.use('/teams', require('../../routes/Teams'));

describe('<TeamsRoute.List>', () => {
  it('should return a list of users', () => {
    mockingoose(TeamModel).toReturn([teamDoc], 'find');
    return request(app)
      .get('/teams')
      .query(validTeamList.body)
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
        expect(body.data[0].logo).toBeDefined();
        expect(body.data[0].stadium).toBeDefined();
      })
  });
  
  it('should return a single team', () => {
    mockingoose(TeamModel).toReturn(teamDoc, 'findOne');
    return request(app)
      .get('/teams/' + teamDoc._id)
      .query(validTeamList.body)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(({body}) => {
        expect(body).toBeDefined();
        expect(body.success).toBe(true);
        expect(body.data).toBeDefined();
        expect(body.data.name).toBeDefined();
        expect(body.data.logo).toBeDefined();
        expect(body.data.stadium).toBeDefined();
      })
  });
  
  it('should fail to return a single team', () => {
    mockingoose(TeamModel).toReturn(null, 'findOne');
    return request(app)
      .get('/teams/' + teamDoc._id)
      .query(validTeamList.body)
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

  afterEach(() => mockingoose(TeamModel).reset())
});

describe('<TeamsRoute.Create>', () => {
  it('should create a team', () => {
    mockingoose(TeamModel).toReturn(0, 'count');
    mockingoose(TeamModel).toReturn(teamDoc, 'save');
    mockingoose(UserModel).toReturn(userDoc, 'findOne');
    const token = createToken({id: new mongoose.Types.ObjectId()});
    return request(app)
      .post('/teams')
      .send(validTeamCreate.body)
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
        expect(body.data.logo).toBeDefined();
        expect(body.data.stadium).toBeDefined();
      })
  });

  it('should fail to create a team', () => {
    mockingoose(TeamModel).toReturn(0, 'count');
    mockingoose(UserModel).toReturn(userDoc, 'findOne');
    const token = createToken({id: new mongoose.Types.ObjectId()});
    return request(app)
      .post('/teams')
      .send(inValidTeamCreate.body)
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
        expect(body.meta.errors.logo).toBeDefined();
        expect(body.meta.errors.stadium).toBeDefined();
        expect(body.meta.errors.name).toBeUndefined();
      })
  });

  it('should fail for when team already exists', () => {
    mockingoose(TeamModel).toReturn(1, 'count');
    mockingoose(UserModel).toReturn(userDoc, 'findOne');
    const token = createToken({id: new mongoose.Types.ObjectId()});
    return request(app)
      .post('/teams')
      .send(validTeamCreate.body)
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
      .post('/teams')
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
      .post('/teams')
      .send(validTeamCreate.body)
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

  afterEach(() => mockingoose(TeamModel).reset())
});

describe('<TeamsRoute.Update>', () => {
  let token;
  beforeAll(() => {
    token = createToken({id: new mongoose.Types.ObjectId()});
  });

  it('should update a team', () => {
    mockingoose(TeamModel).toReturn(0, 'count');
    mockingoose(TeamModel).toReturn(teamDoc, 'findOne');
    mockingoose(TeamModel).toReturn(teamDoc, 'save');
    mockingoose(UserModel).toReturn(userDoc, 'findOne');
    return request(app)
      .put('/teams/' + teamDoc._id)
      .send(validTeamUpdate.body)
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
        expect(body.data.logo).toBeDefined();
        expect(body.data.stadium).toBeDefined();
      })
  });

  it('should fail to update a team', () => {
    mockingoose(TeamModel).toReturn(0, 'count');
    mockingoose(UserModel).toReturn(userDoc, 'findOne');
    return request(app)
      .put('/teams/' + teamDoc._id)
      .send(inValidTeamUpdate.body)
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
        expect(body.meta.errors.logo).toBeDefined();
        expect(body.meta.errors.name).toBeUndefined();
        expect(body.meta.errors.stadium).toBeUndefined();
      })
  });

  it('should fail for when team already exists', () => {
    mockingoose(TeamModel).toReturn(1, 'count');
    mockingoose(UserModel).toReturn(userDoc, 'findOne');
    return request(app)
      .put('/teams/' + teamDoc._id)
      .send(validTeamUpdate.body)
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

  it('should fail for invalid team ID', () => {
    mockingoose(TeamModel).toReturn(0, 'count');
    mockingoose(TeamModel).toReturn(null, 'findOne');
    mockingoose(UserModel).toReturn(userDoc, 'findOne');
    return request(app)
      .put('/teams/' + teamDoc._id)
      .send(validTeamUpdate.body)
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
      .put('/teams/' + teamDoc._id)
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
      .post('/teams')
      .send(validTeamUpdate.body)
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

  afterEach(() => mockingoose(TeamModel).reset())
});

describe('<TeamsRoute.Delete>', () => {
  let token;
  beforeAll(() => {
    token = createToken({id: new mongoose.Types.ObjectId()});
  });

  it('should delete a team', () => {
    mockingoose(TeamModel).toReturn(teamDoc, 'findOne');
    mockingoose(TeamModel).toReturn({deletedCount: 1}, 'delete');
    mockingoose(UserModel).toReturn(userDoc, 'findOne');
    return request(app)
      .delete('/teams/' + teamDoc._id)
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

  it('should fail for invalid team ID', () => {
    mockingoose(TeamModel).toReturn(null, 'findOne');
    mockingoose(UserModel).toReturn(userDoc, 'findOne');
    return request(app)
      .delete('/teams/' + teamDoc._id)
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
      .delete('/teams/' + teamDoc._id)
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
      .delete('/teams/' + teamDoc._id)
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

  afterEach(() => mockingoose(TeamModel).reset())
});