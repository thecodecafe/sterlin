const mockingoose = require('mockingoose').default;
const Controller  = require('../../app/controllers/Teams.controller');
const Team = require('../../app/models/Team.model');
const mockResponse = require('../stubs/mock.response');
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
    const result = await Controller.list(validTeamList, mockResponse());
    expect(result).toBeDefined();
    expect(result.status).toBeDefined();
    expect(result.status).toBe(200);
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
    const result = await Controller.list(validTeamListSearch, mockResponse());
    expect(result).toBeDefined();
    expect(result.status).toBeDefined();
    expect(result.status).toBe(200);
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
    const result = await Controller.find(validTeamFind, mockResponse());
    expect(result).toBeDefined();
    expect(result.status).toBeDefined();
    expect(result.status).toBe(200);
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
    const result = await Controller.find(validTeamFind, mockResponse());
    expect(result).toBeDefined();
    expect(result.status).toBeDefined();
    expect(result.status).toBe(404);
    expect(result.success).toBeDefined();
    expect(result.success).toBe(false);
    expect(result.data).toBeUndefined();
    expect(result.message).toBeDefined();
    expect(result.message).toMatch(/not found/i);
  });

  it('fail to return team', async () => {
    const result = await Controller.find(inValidTeamFind, mockResponse());
    expect(result).toBeDefined();
    expect(result.status).toBeDefined();
    expect(result.status).toBe(404);
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
    const result = await Controller.create(validTeamCreate, mockResponse());
    expect(result).toBeDefined();
    expect(result.status).toBeDefined();
    expect(result.status).toBe(201);
    expect(result.success).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(result.data._id).toBeDefined();
    expect(result.data.name).toBeDefined();
    expect(result.data.stadium).toBeDefined();
    expect(result.data.logo).toBeDefined();
  });

  it('fail to return team', async () => {
    const result = await Controller.create(inValidTeamCreate, mockResponse());
    expect(result).toBeDefined();
    expect(result.status).toBeDefined();
    expect(result.status).toBe(400);
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
    const result = await Controller.update(validTeamUpdate, mockResponse());
    expect(result).toBeDefined();
    expect(result.status).toBeDefined();
    expect(result.status).toBe(200);
    expect(result.success).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(result.data._id).toBeDefined();
    expect(result.data.name).toBeDefined();
    expect(result.data.stadium).toBeDefined();
    expect(result.data.logo).toBeDefined();
  });

  it('fail to return team', async () => {
    const result = await Controller.update(inValidTeamUpdate, mockResponse());
    expect(result).toBeDefined();
    expect(result.status).toBeDefined();
    expect(result.status).toBe(400);
    expect(result.success).toBeDefined();
    expect(result.success).toBe(false);
    expect(result.data).toBeUndefined();
    expect(result.message).toBeDefined();
  });
});

describe('<Searchcontroller.Delete>', () => {
  it('should return an updated team', async () => {
    mockingoose(Team).toReturn(teamDoc, 'findOne');
    const result = await Controller.delete(validTeamDelete, mockResponse());
    expect(result).toBeDefined();
    expect(result.status).toBeDefined();
    expect(result.status).toBe(200);
    expect(result.success).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.data).toBeUndefined();
    expect(result.message).toBeDefined();
  });

  it('fail to return team', async () => {
    const result = await Controller.delete(inValidTeamDelete, mockResponse());
    expect(result).toBeDefined();
    expect(result.status).toBeDefined();
    expect(result.status).toBe(400);
    expect(result.success).toBeDefined();
    expect(result.success).toBe(false);
    expect(result.data).toBeUndefined();
    expect(result.message).toBeDefined();
  });
});