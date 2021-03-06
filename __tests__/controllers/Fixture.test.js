require('../../configs/dotenv');
const mockingoose = require('mockingoose').default;
const Controller  = require('../../app/controllers/Fixtures.controller');
const Fixture = require('../../app/models/Fixture.model');
const Team = require('../../app/models/Team.model');
const Season = require('../../app/models/Season.model');
const httpMocks = require('node-mocks-http');
const { encrypto, decrypto } = require('../../utils/Encryption.util');
const { newfixtureDoc } = require('../stubs/mock-data.fixture');
const { teamDoc } = require('../stubs/mock-data.team');
const { seasonDoc } = require('../stubs/mock-data.season');
const { 
  fixtureList,
  fixtureListSearch,
  fixtureListDateFilter,
  fixtureListCompleted,
  fixtureListOngoing,
  fixtureListPending,
  validFixtureFind,
  inValidFixtureFind,
  validFixtureCreate,
  inValidFixtureCreate,
  validFixtureUpdate,
  inValidFixtureUpdate,
  validFixtureDelete,
  inValidFixtureDelete
} = require('../stubs/mock-request.fixture');

describe('<FixtureController.List>', () => {
  beforeEach(() => mockingoose(Fixture).reset());

  it('should return a list of fixtures', async () => {
    mockingoose(Fixture).toReturn([newfixtureDoc], 'find');
    // create mock response
    const response = httpMocks.createResponse();
    // make request
    await Controller.list(fixtureList, response);
    // get response JSON data
    const result = response._getJSONData();
    // get the status code
    const statusCode = response._getStatusCode();
    // check response
    expect(result).toBeDefined();
    expect(statusCode).toBe(200);
    expect(result.success).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(result.data[0]).toBeDefined();
    expect(result.data[0]._id).toBeDefined();
    expect(result.data[0].season).toBeDefined();
    expect(result.data[0].homeTeam).toBeDefined();
    expect(result.data[0].awayTeam).toBeDefined();
    expect(result.data[0].homeGoals).toBeDefined();
    expect(result.data[0].awayGoals).toBeDefined();
    expect(result.data[0].startsAt).toBeDefined();
    expect(result.data[0].endsAt).toBeDefined();
  });

  it('should return a list of fixtures if searched', async () => {
    mockingoose(Fixture).toReturn([newfixtureDoc], 'find');
    mockingoose(Team).toReturn([teamDoc], 'find');
    // create mock response
    const response = httpMocks.createResponse();
    // make request
    await Controller.list(fixtureListSearch, response);
    // get response JSON data
    const result = response._getJSONData();
    // get the status code
    const statusCode = response._getStatusCode();
    // check response
    expect(result).toBeDefined();
    expect(statusCode).toBe(200);
    expect(result.success).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(result.data[0]).toBeDefined();
    expect(result.data[0]._id).toBeDefined();
    expect(result.data[0].season).toBeDefined();
    expect(result.data[0].homeTeam).toBeDefined();
    expect(result.data[0].awayTeam).toBeDefined();
    expect(result.data[0].homeGoals).toBeDefined();
    expect(result.data[0].awayGoals).toBeDefined();
    expect(result.data[0].startsAt).toBeDefined();
    expect(result.data[0].endsAt).toBeDefined();
  });

  it('should return a list of fixtures filtered by date', async () => {
    mockingoose(Fixture).toReturn([newfixtureDoc], 'find');
    // create mock response
    const response = httpMocks.createResponse();
    // make request
    await Controller.list(fixtureListDateFilter, response);
    // get response JSON data
    const result = response._getJSONData();
    // get the status code
    const statusCode = response._getStatusCode();
    // check response
    expect(result).toBeDefined();
    expect(statusCode).toBe(200);
    expect(result.success).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(result.data[0]).toBeDefined();
    expect(result.data[0]._id).toBeDefined();
    expect(result.data[0].season).toBeDefined();
    expect(result.data[0].homeTeam).toBeDefined();
    expect(result.data[0].awayTeam).toBeDefined();
    expect(result.data[0].homeGoals).toBeDefined();
    expect(result.data[0].awayGoals).toBeDefined();
    expect(result.data[0].startsAt).toBeDefined();
    expect(result.data[0].endsAt).toBeDefined();
  });

  it('should return a list of pending fixtures', async () => {
    mockingoose(Fixture).toReturn([newfixtureDoc], 'find');
    // create mock response
    const response = httpMocks.createResponse();
    // make request
    await Controller.list(fixtureListPending, response);
    // get response JSON data
    const result = response._getJSONData();
    // get the status code
    const statusCode = response._getStatusCode();
    // check response
    expect(result).toBeDefined();
    expect(statusCode).toBe(200);
    expect(result.success).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(result.data[0]).toBeDefined();
    expect(result.data[0]._id).toBeDefined();
    expect(result.data[0].season).toBeDefined();
    expect(result.data[0].homeTeam).toBeDefined();
    expect(result.data[0].awayTeam).toBeDefined();
    expect(result.data[0].homeGoals).toBeDefined();
    expect(result.data[0].awayGoals).toBeDefined();
    expect(result.data[0].startsAt).toBeDefined();
    expect(result.data[0].endsAt).toBeDefined();
  });

  it('should return a list of ongoing fixtures', async () => {
    mockingoose(Fixture).toReturn([newfixtureDoc], 'find');
    // create mock response
    const response = httpMocks.createResponse();
    // make request
    await Controller.list(fixtureListOngoing, response);
    // get response JSON data
    const result = response._getJSONData();
    // get the status code
    const statusCode = response._getStatusCode();
    // check response
    expect(result).toBeDefined();
    expect(statusCode).toBe(200);
    expect(result.success).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(result.data[0]).toBeDefined();
    expect(result.data[0]._id).toBeDefined();
    expect(result.data[0].season).toBeDefined();
    expect(result.data[0].homeTeam).toBeDefined();
    expect(result.data[0].awayTeam).toBeDefined();
    expect(result.data[0].homeGoals).toBeDefined();
    expect(result.data[0].awayGoals).toBeDefined();
    expect(result.data[0].startsAt).toBeDefined();
    expect(result.data[0].endsAt).toBeDefined();
  });

  it('should return a list of completed fixtures', async () => {
    mockingoose(Fixture).toReturn([newfixtureDoc], 'find');
    // create mock response
    const response = httpMocks.createResponse();
    // make request
    await Controller.list(fixtureListCompleted, response);
    // get response JSON data
    const result = response._getJSONData();
    // get the status code
    const statusCode = response._getStatusCode();
    // check response
    expect(result).toBeDefined();
    expect(statusCode).toBe(200);
    expect(result.success).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(result.data[0]).toBeDefined();
    expect(result.data[0]._id).toBeDefined();
    expect(result.data[0].season).toBeDefined();
    expect(result.data[0].homeTeam).toBeDefined();
    expect(result.data[0].awayTeam).toBeDefined();
    expect(result.data[0].homeGoals).toBeDefined();
    expect(result.data[0].awayGoals).toBeDefined();
    expect(result.data[0].startsAt).toBeDefined();
    expect(result.data[0].endsAt).toBeDefined();
  });
});

describe('<FixturesController.Find>', () => {
  beforeEach(() => mockingoose(Fixture).reset());

  it('should return a fixture', async () => {
    mockingoose(Fixture).toReturn(newfixtureDoc, 'findOne');
    // create mock response
    const response = httpMocks.createResponse();
    // make request
    await Controller.find(validFixtureFind, response);
    // get response JSON data
    const result = response._getJSONData();
    // get the status code
    const statusCode = response._getStatusCode();
    // check response
    expect(result).toBeDefined();
    expect(statusCode).toBe(200);
    expect(result.success).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(result.data._id).toBeDefined();
    expect(result.data.season).toBeDefined();
    expect(result.data.homeTeam).toBeDefined();
    expect(result.data.awayTeam).toBeDefined();
    expect(result.data.homeGoals).toBeDefined();
    expect(result.data.awayGoals).toBeDefined();
    expect(result.data.startsAt).toBeDefined();
    expect(result.data.endsAt).toBeDefined();
  });

  it('fail to return fixture', async () => {
    mockingoose(Fixture).toReturn(null, 'findOne');
    // create mock response
    const response = httpMocks.createResponse();
    // make request
    await Controller.find(validFixtureFind, response);
    // get response JSON data
    const result = response._getJSONData();
    // get the status code
    const statusCode = response._getStatusCode();
    // check response
    expect(result).toBeDefined();
    expect(statusCode).toBe(404);
    expect(result.success).toBeDefined();
    expect(result.success).toBe(false);
    expect(result.data).toBeUndefined();
    expect(result.message).toBeDefined();
    expect(result.message).toMatch(/not found/i);
  });

  it('fail to return fixture', async () => {
    // create mock response
    const response = httpMocks.createResponse();
    // make request
    await Controller.find(inValidFixtureFind, response);
    // get response JSON data
    const result = response._getJSONData();
    // get the status code
    const statusCode = response._getStatusCode();
    // check response
    expect(result).toBeDefined();
    expect(statusCode).toBe(404);
    expect(result.success).toBeDefined();
    expect(result.success).toBe(false);
    expect(result.data).toBeUndefined();
    expect(result.message).toBeDefined();
    expect(result.message).toMatch(/without an id/i);
  });
});

describe('<FixturesController.Links>', () => {
  beforeEach(() => mockingoose(Fixture).reset());
  it('should return a generated link', async () => {
    mockingoose(Fixture).toReturn(newfixtureDoc, 'findOne');
    // create mock response
    const response = httpMocks.createResponse();
    // make request
    await Controller.generateLink({
      params: {id: encrypto(newfixtureDoc._id)}
    }, response);
    // get response JSON data
    const result = response._getJSONData();
    // get the status code
    const statusCode = response._getStatusCode();
    // check response
    expect(result).toBeDefined();
    expect(statusCode).toBe(201);
    expect(result.success).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(result.data.link).toBeDefined();
    expect(typeof(result.data.link)).toBe('string');
  });

  it('should fail to generate link', async () => {
    mockingoose(Fixture).toReturn(null, 'findOne');
    // create mock response
    const response = httpMocks.createResponse();
    // make request
    await Controller.generateLink({
      params: {id: newfixtureDoc._id}
    }, response);
    // get response JSON data
    const result = response._getJSONData();
    // get the status code
    const statusCode = response._getStatusCode();
    // check response
    expect(result).toBeDefined();
    expect(statusCode).toBe(404);
    expect(result.success).toBe(false);
    expect(result.message).toMatch(/not found/i);
  });

  it('should return fixture belonging to link', async () => {
    mockingoose(Fixture).toReturn(newfixtureDoc, 'findOne');
    // create mock response
    const response = httpMocks.createResponse();
    // make request
    await Controller.verifyLink({
      params: {code: encrypto(newfixtureDoc._id)}
    }, response);
    // get response JSON data
    const result = response._getJSONData();
    // get the status code
    const statusCode = response._getStatusCode();
    // check response
    expect(result).toBeDefined();
    expect(statusCode).toBe(200);
    expect(result.success).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(result.data._id).toBeDefined();
    expect(result.data.season).toBeDefined();
    expect(result.data.homeTeam).toBeDefined();
    expect(result.data.awayTeam).toBeDefined();
    expect(result.data.homeGoals).toBeDefined();
    expect(result.data.awayGoals).toBeDefined();
    expect(result.data.startsAt).toBeDefined();
    expect(result.data.endsAt).toBeDefined();
  });

  it('should fail if failed to decrypt code', async () => {
    // create mock response
    const response = httpMocks.createResponse();
    // make request
    await Controller.verifyLink({params: {code: null}}, response);
    // get response JSON data
    const result = response._getJSONData();
    // get the status code
    const statusCode = response._getStatusCode();
    // check response
    expect(result).toBeDefined();
    expect(statusCode).toBe(400);
    expect(result.success).toBe(false);
    expect(result.message).toMatch(/invalid/i);
  });

  it('should fail if fixture is not found', async () => {
    mockingoose(Fixture).toReturn(null, 'findOne');
    // create mock response
    const response = httpMocks.createResponse();
    // make request
    await Controller.verifyLink({
      params: {code: encrypto(newfixtureDoc._id)}
    }, response);
    // get response JSON data
    const result = response._getJSONData();
    // get the status code
    const statusCode = response._getStatusCode();
    // check response
    expect(result).toBeDefined();
    expect(statusCode).toBe(404);
    expect(result.success).toBe(false);
    expect(result.message).toMatch(/not found/i);
  });
});

describe('<FixturesController.Create>', () => {
  beforeEach(() => mockingoose(Fixture).reset());

  it('should return a created fixture', async () => {
    mockingoose(Fixture).toReturn(newfixtureDoc, 'save');
    mockingoose(Season).toReturn(seasonDoc, 'findOne');
    mockingoose(Team).toReturn(teamDoc, 'findOne');
    // create mock response
    const response = httpMocks.createResponse();
    // make request
    await Controller.create(validFixtureCreate, response);
    // get response JSON data
    const result = response._getJSONData();
    // get the status code
    const statusCode = response._getStatusCode();
    // check response
    expect(result).toBeDefined();
    expect(statusCode).toBe(201);
    expect(result.success).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(result.data._id).toBeDefined();
    expect(result.data.season).toBeDefined();
    expect(result.data.homeTeam).toBeDefined();
    expect(result.data.awayTeam).toBeDefined();
    expect(result.data.homeGoals).toBeDefined();
    expect(result.data.awayGoals).toBeDefined();
    expect(result.data.startsAt).toBeDefined();
    expect(result.data.endsAt).toBeDefined();
  });

  it('fail to return fixture', async () => {
    // create mock response
    const response = httpMocks.createResponse();
    // make request
    await Controller.create(inValidFixtureCreate, response);
    // get response JSON data
    const result = response._getJSONData();
    // get the status code
    const statusCode = response._getStatusCode();
    // check response
    expect(result).toBeDefined();
    expect(statusCode).toBe(400);
    expect(result.success).toBeDefined();
    expect(result.success).toBe(false);
    expect(result.data).toBeUndefined();
    expect(result.message).toBeDefined();
  });
});

describe('<FixturesController.Update>', () => {
  beforeEach(() => mockingoose(Fixture).reset());

  it('should return an updated fixture', async () => {
    mockingoose(Fixture).toReturn(newfixtureDoc, 'findOne');
    mockingoose(Fixture).toReturn(newfixtureDoc, 'save');
    // create mock response
    const response = httpMocks.createResponse();
    // make request
    await Controller.update(validFixtureUpdate, response);
    // get response JSON data
    const result = response._getJSONData();
    // get the status code
    const statusCode = response._getStatusCode();
    // check response
    expect(result).toBeDefined();
    expect(statusCode).toBe(200);
    expect(result.success).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(result.data._id).toBeDefined();
    expect(result.data.season).toBeDefined();
    expect(result.data.homeTeam).toBeDefined();
    expect(result.data.awayTeam).toBeDefined();
    expect(result.data.homeGoals).toBeDefined();
    expect(result.data.awayGoals).toBeDefined();
    expect(result.data.startsAt).toBeDefined();
    expect(result.data.endsAt).toBeDefined();
  });

  it('fail to return fixture', async () => {
    // create mock response
    const response = httpMocks.createResponse();
    // make request
    await Controller.update(inValidFixtureUpdate, response);
    // get response JSON data
    const result = response._getJSONData();
    // get the status code
    const statusCode = response._getStatusCode();
    // check response
    expect(result).toBeDefined();
    expect(statusCode).toBe(400);
    expect(result.success).toBeDefined();
    expect(result.success).toBe(false);
    expect(result.data).toBeUndefined();
    expect(result.message).toBeDefined();
  });
});

describe('<FixturesController.Delete>', () => {
  beforeEach(() => mockingoose(Fixture).reset());

  it('should return an updated fixture', async () => {
    mockingoose(Fixture).toReturn(newfixtureDoc, 'findOne');
    // create mock response
    const response = httpMocks.createResponse();
    // make request
    await Controller.delete(validFixtureDelete, response);
    // get response JSON data
    const result = response._getJSONData();
    // get the status code
    const statusCode = response._getStatusCode();
    // check response
    expect(result).toBeDefined();
    expect(statusCode).toBe(200);
    expect(result.success).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.data).toBeUndefined();
    expect(result.message).toBeDefined();
  });

  it('fail to return fixture', async () => {
    // create mock response
    const response = httpMocks.createResponse();
    // make request
    await Controller.delete(inValidFixtureDelete, response);
    // get response JSON data
    const result = response._getJSONData();
    // get the status code
    const statusCode = response._getStatusCode();
    // check response
    expect(result).toBeDefined();
    expect(statusCode).toBe(400);
    expect(result.success).toBeDefined();
    expect(result.success).toBe(false);
    expect(result.data).toBeUndefined();
    expect(result.message).toBeDefined();
  });
});