const CreateValidation = require('../../app/validations/CreateTeam.validation');
const UpdateValidation = require('../../app/validations/UpdateTeam.validation');
const {
  validTeamCreate,
  inValidTeamCreate,
  validTeamUpdate,
  inValidTeamUpdate
} = require('../stubs/mock-request.team');
const RunValidation = require('../stubs/run-validation.fn');
const mockingoose = require('mockingoose').default;
const Team = require('../../app/models/Team.model');

describe('<CreateTeamValidation>', () => {
  it('should be an array of validations', () => {
    expect(CreateValidation).toBeDefined();
    expect(CreateValidation.constructor).toBe(Array);
  })

  it('should pass', async () => {
    mockingoose(Team).toReturn(0, 'count')
    const result = await RunValidation(validTeamCreate, CreateValidation);
    expect(result).toBeDefined();
    expect(result.isEmpty).toBeDefined();
    expect(result.isEmpty()).toBeTruthy();
  })

  it('should fail', async () => {
    mockingoose(Team).toReturn(1, 'count');
    const result = await RunValidation(inValidTeamCreate, CreateValidation);
    expect(result).toBeDefined();
    expect(result.isEmpty).toBeDefined();
    expect(result.isEmpty()).toBeFalsy();
    expect(result.array).toBeDefined();
    expect(result.array().findIndex(item => item.param == 'stadium')).not.toBe(-1);
    expect(result.array().findIndex(item => item.param == 'logo')).not.toBe(-1);
  })

  afterEach(() => mockingoose(Team).reset());
});

describe('<UpdateTeamValidation>', () => {
  it('should be an array of validations', () => {
    expect(UpdateValidation).toBeDefined();
    expect(UpdateValidation.constructor).toBe(Array);
  })

  it('should pass', async () => {
    mockingoose(Team).toReturn(0, 'count')
    const result = await RunValidation(validTeamUpdate, UpdateValidation);
    expect(result).toBeDefined();
    expect(result.isEmpty).toBeDefined();
    expect(result.isEmpty()).toBeTruthy();
  })
  
  it('should fail', async () => {
    mockingoose(Team).toReturn(1, 'count');
    const result = await RunValidation(inValidTeamUpdate, UpdateValidation);
    expect(result).toBeDefined();
    expect(result.isEmpty).toBeDefined();
    expect(result.isEmpty()).toBeFalsy();
    expect(result.array).toBeDefined();
    expect(result.array().findIndex(item => item.param == 'name')).not.toBe(-1);
    expect(result.array().findIndex(item => item.param == 'logo')).not.toBe(-1);
  })

  afterEach(() => mockingoose(Team).reset());
});