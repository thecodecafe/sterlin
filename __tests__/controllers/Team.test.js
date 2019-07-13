const mockingoose = require('mockingoose').default;
const Controller  = require('../../app/controllers/Teams.controller');
const Team = require('../../app/models/Team.model');
const httpMocks = require('node-mocks-http');
const { teamDoc } = require('../stubs/mock-data.team');
const { 
  validTeamList,
  validTeamListSearch,
  validTeamFind,
  inValidTeamFind,
  validTeamCreate,
  inValidTeamCreate,
  validTeamUpdate,
  inValidTeamUpdate,
  validTeamDelete,
  inValidTeamDelete
} = require('../stubs/mock-request.team');

describe('<TeamController.List>', () => {
  it('should return a list of teams', async () => {
    mockingoose(Team).toReturn([teamDoc], 'find');
    // create mock response
    const response = httpMocks.createResponse();
    // make request
    await Controller.list(validTeamList, response);
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
    expect(result.data[0].name).toBeDefined();
    expect(result.data[0].stadium).toBeDefined();
    expect(result.data[0].logo).toBeDefined();
  });

  it('should return a list of teams if searched', async () => {
    mockingoose(Team).toReturn([teamDoc], 'find');
    // create mock response
    const response = httpMocks.createResponse();
    // make request
    await Controller.list(validTeamListSearch, response);
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
    expect(result.data[0].name).toBeDefined();
    expect(result.data[0].stadium).toBeDefined();
    expect(result.data[0].logo).toBeDefined();
  });
});

describe('<Searchcontroller.Find>', () => {
  it('should return a team', async () => {
    mockingoose(Team).toReturn(teamDoc, 'findOne');
    // create mock response
    const response = httpMocks.createResponse();
    // make request
    await Controller.find(validTeamFind, response);
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
    expect(result.data.name).toBeDefined();
    expect(result.data.stadium).toBeDefined();
    expect(result.data.logo).toBeDefined();
  });

  it('fail to return team', async () => {
    mockingoose(Team).toReturn(null, 'findOne');
    // create mock response
    const response = httpMocks.createResponse();
    // make request
    await Controller.find(validTeamFind, response);
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

  it('fail to return team', async () => {
    // create mock response
    const response = httpMocks.createResponse();
    // make request
    await Controller.find(inValidTeamFind, response);
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

describe('<Searchcontroller.Create>', () => {
  it('should return a created team', async () => {
    mockingoose(Team).toReturn(teamDoc, 'save');
    // create mock response
    const response = httpMocks.createResponse();
    // make request
    await Controller.create(validTeamCreate, response);
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
    expect(result.data.name).toBeDefined();
    expect(result.data.stadium).toBeDefined();
    expect(result.data.logo).toBeDefined();
  });

  it('fail to return team', async () => {
    // create mock response
    const response = httpMocks.createResponse();
    // make request
    await Controller.create(inValidTeamCreate, response);
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

describe('<Searchcontroller.Update>', () => {
  it('should return an updated team', async () => {
    mockingoose(Team).toReturn(teamDoc, 'findOne');
    mockingoose(Team).toReturn(teamDoc, 'save');
    // create mock response
    const response = httpMocks.createResponse();
    // make request
    await Controller.update(validTeamUpdate, response);
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
    expect(result.data.name).toBeDefined();
    expect(result.data.stadium).toBeDefined();
    expect(result.data.logo).toBeDefined();
  });

  it('fail to return team', async () => {
    // create mock response
    const response = httpMocks.createResponse();
    // make request
    await Controller.update(inValidTeamUpdate, response);
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

describe('<Searchcontroller.Delete>', () => {
  it('should return an updated team', async () => {
    mockingoose(Team).toReturn(teamDoc, 'findOne');
    // create mock response
    const response = httpMocks.createResponse();
    // make request
    await Controller.delete(validTeamDelete, response);
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

  it('fail to return team', async () => {
    // create mock response
    const response = httpMocks.createResponse();
    // make request
    await Controller.delete(inValidTeamDelete, response);
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