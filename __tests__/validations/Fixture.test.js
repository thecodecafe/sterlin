const CreateValidation = require('../../app/validations/CreateFixture.validation');
const UpdateValidation = require('../../app/validations/UpdateFixture.validation');
const {
  validFixtureCreate,
  inValidFixtureCreate,
  validFixtureUpdate,
  inValidFixtureUpdate
} = require('../stubs/mock-request.fixture');
const RunValidation = require('../stubs/run-validation.fn');
const mockingoose = require('mockingoose').default;
const Fixture = require('../../app/models/Fixture.model');
const Team = require('../../app/models/Team.model');
const Season = require('../../app/models/Season.model');

describe('<CreateFixtureValidation>', () => {
  beforeAll(() => {
    mockingoose(Season).toReturn(1, 'count');
  })

  it('should be an array of validations', () => {
    expect(CreateValidation).toBeDefined();
    expect(CreateValidation.constructor).toBe(Array);
  })

  it('should pass', async () => {
    mockingoose(Team).toReturn(1, 'count')
    const result = await RunValidation(validFixtureCreate, CreateValidation);
    expect(result).toBeDefined();
    expect(result.isEmpty).toBeDefined();
    expect(result.isEmpty()).toBeTruthy();
  })

  it('should fail', async () => {
    mockingoose(Team).toReturn(0, 'count');
    const result = await RunValidation(inValidFixtureCreate, CreateValidation);
    expect(result).toBeDefined();
    expect(result.isEmpty).toBeDefined();
    expect(result.isEmpty()).toBeFalsy();
    expect(result.array).toBeDefined();
    expect(result.array().findIndex(item => item.param == 'season')).not.toBe(-1);
    expect(result.array().findIndex(item => item.param == 'startsAt')).not.toBe(-1);
    expect(result.array().findIndex(item => item.param == 'homeTeam')).not.toBe(-1);
    expect(result.array().findIndex(item => item.param == 'awayTeam')).not.toBe(-1);
  })

  it('should fail if invalid season is passed', async () => {
    mockingoose(Season).toReturn(0, 'count');
    const result = await RunValidation(validFixtureCreate, CreateValidation);
    expect(result).toBeDefined();
    expect(result.isEmpty).toBeDefined();
    expect(result.isEmpty()).toBeFalsy();
    expect(result.array).toBeDefined();
    expect(result.array().findIndex(item => item.param == 'season')).not.toBe(-1);
  })

  it('should fail for same team', async () => {
    mockingoose(Team).toReturn(1, 'count');
    const result = await RunValidation({
      ...inValidFixtureCreate,
      body: {
        ...inValidFixtureCreate.body,
        awayTeam: inValidFixtureCreate.body.homeTeam
      }
    }, CreateValidation);
    expect(result).toBeDefined();
    expect(result.isEmpty).toBeDefined();
    expect(result.isEmpty()).toBeFalsy();
    expect(result.array).toBeDefined();
    expect(result.array().findIndex(item => item.param == 'homeTeam')).not.toBe(-1);
    expect(result.array().findIndex(item => item.param == 'awayTeam')).not.toBe(-1);
  })

  afterEach(() => {
    mockingoose(Fixture).reset();
    mockingoose(Team).reset();
  });
});

describe('<UpdateFixtureValidation>', () => {
  it('should be an array of validations', () => {
    expect(UpdateValidation).toBeDefined();
    expect(UpdateValidation.constructor).toBe(Array);
  })

  it('should pass', async () => {
    mockingoose(Season).toReturn(1, 'count')
    const result = await RunValidation(validFixtureUpdate, UpdateValidation);
    expect(result).toBeDefined();
    expect(result.isEmpty).toBeDefined();
    expect(result.isEmpty()).toBeTruthy();
    expect(result.array().findIndex(item => item.param == 'season')).toBe(-1);
  })
  
  it('should fail', async () => {
    mockingoose(Season).toReturn(0, 'count');
    mockingoose(Team).toReturn(1, 'count');
    const result = await RunValidation(inValidFixtureUpdate, UpdateValidation);
    expect(result).toBeDefined();
    expect(result.isEmpty).toBeDefined();
    expect(result.isEmpty()).toBeFalsy();
    expect(result.array).toBeDefined();
    expect(result.array().findIndex(item => item.param == 'season')).not.toBe(-1);
    expect(result.array().findIndex(item => item.param == 'startsAt')).not.toBe(-1);
    expect(result.array().findIndex(item => item.param == 'homeTeam')).not.toBe(-1);
    expect(result.array().findIndex(item => item.param == 'awayTeam')).not.toBe(-1);
  })
  
  it('should fail if team IDs are invalid', async () => {
    mockingoose(Team).toReturn(0, 'count');
    const result = await RunValidation({
      body: {
        homeTeam: validFixtureCreate.body.homeTeam,
        awayTeam: validFixtureCreate.body.awayTeam,
      }
    }, UpdateValidation);
    expect(result).toBeDefined();
    expect(result.isEmpty).toBeDefined();
    expect(result.isEmpty()).toBeFalsy();
    expect(result.array).toBeDefined();
    expect(result.array().findIndex(item => item.param == 'homeTeam')).not.toBe(-1);
    expect(result.array().findIndex(item => item.param == 'awayTeam')).not.toBe(-1);
  })

  it('should fail if home and away team are the same', async () => {
    mockingoose(Team).toReturn(1, 'count');
    const result = await RunValidation({
      body: {
        homeTeam: validFixtureCreate.body.homeTeam,
        awayTeam: validFixtureCreate.body.homeTeam,
      }
    }, UpdateValidation);
    expect(result).toBeDefined();
    expect(result.isEmpty).toBeDefined();
    expect(result.isEmpty()).toBeFalsy();
    expect(result.array).toBeDefined();
    expect(result.array().findIndex(item => item.param == 'homeTeam')).not.toBe(-1);
    expect(result.array().findIndex(item => item.param == 'awayTeam')).not.toBe(-1);
  })

  it('should fail if away team is same with home team', async () => {
    mockingoose(Team).toReturn(1, 'count');
    mockingoose(Season).toReturn(1, 'count');

    // return 1 when home in condition is sam as away in body
    mockingoose(Fixture).toReturn(query => {
      const conditions = query.getQuery();
        return conditions.homeTeam === validFixtureCreate.body.awayTeam
          ? 1 
          : 0;
    }, 'count');

    // run validation
    const result = await RunValidation({
      body: {
        homeTeam: validFixtureCreate.body.homeTeam,
        awayTeam: validFixtureCreate.body.awayTeam
      }
    }, UpdateValidation);

    expect(result).toBeDefined();
    expect(result.isEmpty).toBeDefined();
    expect(result.isEmpty()).toBeFalsy();
    expect(result.array).toBeDefined();
    expect(result.array().length).toBe(1);
    expect(result.array().findIndex(item => item.param == 'awayTeam')).not.toBe(-1);
  })

  it('should fail if home team is same with away team', async () => {
    mockingoose(Team).toReturn(1, 'count');
    mockingoose(Season).toReturn(1, 'count');

    // return 1 when away in condition is sam as home in body
    mockingoose(Fixture).toReturn(query => {
      const conditions = query.getQuery();
        return conditions.awayTeam === validFixtureCreate.body.homeTeam
          ? 1 
          : 0;
    }, 'count');

    // run validation
    const result = await RunValidation({
      body: {
        homeTeam: validFixtureCreate.body.homeTeam,
        awayTeam: validFixtureCreate.body.awayTeam
      }
    }, UpdateValidation);

    expect(result).toBeDefined();
    expect(result.isEmpty).toBeDefined();
    expect(result.isEmpty()).toBeFalsy();
    expect(result.array).toBeDefined();
    expect(result.array().length).toBe(1);
    expect(result.array().findIndex(item => item.param == 'homeTeam')).not.toBe(-1);
  })

  afterEach(() => {
    mockingoose(Fixture).reset();
    mockingoose(Team).reset();
    mockingoose(Season).reset();
  });
});