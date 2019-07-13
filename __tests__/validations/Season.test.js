const CreateValidation = require('../../app/validations/CreateSeason.validation');
const UpdateValidation = require('../../app/validations/UpdateSeason.validation');
const {
  validSeasonCreate,
  inValidSeasonCreate,
  validSeasonUpdate,
  inValidSeasonUpdate
} = require('../stubs/mock-request.season');
const RunValidation = require('../stubs/run-validation.fn');
const mockingoose = require('mockingoose').default;
const Season = require('../../app/models/Season.model');

describe('<CreateSeasonValidation>', () => {
  it('should be an array of validations', () => {
    expect(CreateValidation).toBeDefined();
    expect(CreateValidation.constructor).toBe(Array);
  })

  it('should pass', async () => {
    mockingoose(Season).toReturn(0, 'count')
    const result = await RunValidation(validSeasonCreate, CreateValidation);
    expect(result).toBeDefined();
    expect(result.isEmpty).toBeDefined();
    expect(result.isEmpty()).toBeTruthy();
  })

  it('should fail', async () => {
    mockingoose(Season).toReturn(1, 'count');
    const result = await RunValidation(inValidSeasonCreate, CreateValidation);
    expect(result).toBeDefined();
    expect(result.isEmpty).toBeDefined();
    expect(result.isEmpty()).toBeFalsy();
    expect(result.array).toBeDefined();
    expect(result.array().findIndex(item => item.param == 'startDate')).not.toBe(-1);
    expect(result.array().findIndex(item => item.param == 'endDate')).not.toBe(-1);
  })

  afterEach(() => mockingoose(Season).reset());
});

describe('<UpdateSeasonValidation>', () => {
  it('should be an array of validations', () => {
    expect(UpdateValidation).toBeDefined();
    expect(UpdateValidation.constructor).toBe(Array);
  })

  it('should pass', async () => {
    mockingoose(Season).toReturn(0, 'count')
    const result = await RunValidation(validSeasonUpdate, UpdateValidation);
    expect(result).toBeDefined();
    expect(result.isEmpty).toBeDefined();
    expect(result.isEmpty()).toBeTruthy();
  })
  
  it('should fail', async () => {
    mockingoose(Season).toReturn(1, 'count');
    const result = await RunValidation(inValidSeasonUpdate, UpdateValidation);
    expect(result).toBeDefined();
    expect(result.isEmpty).toBeDefined();
    expect(result.isEmpty()).toBeFalsy();
    expect(result.array).toBeDefined();
    expect(result.array().findIndex(item => item.param == 'startDate')).not.toBe(-1);
  })

  afterEach(() => mockingoose(Season).reset());
});