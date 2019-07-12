const mockingoose = require('mockingoose').default;
const Controller  = require('../../app/controllers/Seasons.controller');
const Season = require('../../app/models/Season.model');
const mockResponse = require('../stubs/mock.response');
const { seasonDoc } = require('../stubs/mock-data.season');
const { 
  validSeasonList,
  validSeasonListSearch,
  validSeasonFind,
  inValidSeasonFind,
  validSeasonCreate,
  inValidSeasonCreate,
  validSeasonUpdate,
  inValidSeasonUpdate,
  validSeasonDelete,
  inValidSeasonDelete
} = require('../stubs/mock-request.season');

describe('<SeasonController.List>', () => {
  it('should return a list of seasons', async () => {
    mockingoose(Season).toReturn([seasonDoc], 'find');
    const result = await Controller.list(validSeasonList, mockResponse());
    expect(result).toBeDefined();
    expect(result.status).toBeDefined();
    expect(result.status).toBe(200);
    expect(result.success).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(result.data[0]).toBeDefined();
    expect(result.data[0]._id).toBeDefined();
    expect(result.data[0].name).toBeDefined();
    expect(result.data[0].startDate).toBeDefined();
    expect(result.data[0].endDate).toBeDefined();
  });

  it('should return a list of seasons if searched', async () => {
    mockingoose(Season).toReturn([seasonDoc], 'find');
    const result = await Controller.list(validSeasonListSearch, mockResponse());
    expect(result).toBeDefined();
    expect(result.status).toBeDefined();
    expect(result.status).toBe(200);
    expect(result.success).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(result.data[0]).toBeDefined();
    expect(result.data[0]._id).toBeDefined();
    expect(result.data[0].name).toBeDefined();
    expect(result.data[0].startDate).toBeDefined();
    expect(result.data[0].endDate).toBeDefined();
  });
});

describe('<Searchcontroller.Find>', () => {
  it('should return a season', async () => {
    mockingoose(Season).toReturn(seasonDoc, 'findOne');
    const result = await Controller.find(validSeasonFind, mockResponse());
    expect(result).toBeDefined();
    expect(result.status).toBeDefined();
    expect(result.status).toBe(200);
    expect(result.success).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(result.data._id).toBeDefined();
    expect(result.data.name).toBeDefined();
    expect(result.data.startDate).toBeDefined();
    expect(result.data.endDate).toBeDefined();
  });

  it('fail to return season', async () => {
    mockingoose(Season).toReturn(null, 'findOne');
    const result = await Controller.find(validSeasonFind, mockResponse());
    expect(result).toBeDefined();
    expect(result.status).toBeDefined();
    expect(result.status).toBe(404);
    expect(result.success).toBeDefined();
    expect(result.success).toBe(false);
    expect(result.data).toBeUndefined();
    expect(result.message).toBeDefined();
    expect(result.message).toMatch(/not found/i);
  });

  it('fail to return season', async () => {
    const result = await Controller.find(inValidSeasonFind, mockResponse());
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
  it('should return a created season', async () => {
    mockingoose(Season).toReturn(seasonDoc, 'save');
    const result = await Controller.create(validSeasonCreate, mockResponse());
    expect(result).toBeDefined();
    expect(result.status).toBeDefined();
    expect(result.status).toBe(201);
    expect(result.success).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(result.data._id).toBeDefined();
    expect(result.data.name).toBeDefined();
    expect(result.data.startDate).toBeDefined();
    expect(result.data.endDate).toBeDefined();
  });

  it('fail to return season', async () => {
    const result = await Controller.create(inValidSeasonCreate, mockResponse());
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
  it('should return an updated season', async () => {
    mockingoose(Season).toReturn(seasonDoc, 'findOne');
    mockingoose(Season).toReturn(seasonDoc, 'save');
    const result = await Controller.update(validSeasonUpdate, mockResponse());
    expect(result).toBeDefined();
    expect(result.status).toBeDefined();
    expect(result.status).toBe(200);
    expect(result.success).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(result.data._id).toBeDefined();
    expect(result.data.name).toBeDefined();
    expect(result.data.startDate).toBeDefined();
    expect(result.data.endDate).toBeDefined();
  });

  it('fail to return season', async () => {
    const result = await Controller.update(inValidSeasonUpdate, mockResponse());
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
  it('should return an updated season', async () => {
    mockingoose(Season).toReturn(seasonDoc, 'findOne');
    const result = await Controller.delete(validSeasonDelete, mockResponse());
    expect(result).toBeDefined();
    expect(result.status).toBeDefined();
    expect(result.status).toBe(200);
    expect(result.success).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.data).toBeUndefined();
    expect(result.message).toBeDefined();
  });

  it('fail to return season', async () => {
    const result = await Controller.delete(inValidSeasonDelete, mockResponse());
    expect(result).toBeDefined();
    expect(result.status).toBeDefined();
    expect(result.status).toBe(400);
    expect(result.success).toBeDefined();
    expect(result.success).toBe(false);
    expect(result.data).toBeUndefined();
    expect(result.message).toBeDefined();
  });
});