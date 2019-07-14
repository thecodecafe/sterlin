const mockingoose = require('mockingoose').default;
const Repo = require('../../app/repositories/Team.repository');
const Team = require('../../app/models/Team.model');
const { teamDoc, invalidLogo } = require('../stubs/mock-data.team');

describe('<TeamRepository.list>', () => {
  // reseet mockinggoose per test
  beforeEach(() => mockingoose(Team).reset());

  it('should return a list without options', async (done) => {
    // set document to return when fetching list
    mockingoose(Team).toReturn([teamDoc], 'find');
    // get teams
    const teams = await Repo.list();
    // check result
    expect(teams).toBeDefined();
    expect(teams.length).toBeDefined();
    expect(teams.length).toBe(1);
    expect(teams[0]).toBeDefined();
    expect(teams[0].name).toBe(teamDoc.name);
    // end test
    done();
  });

  it('should return a list with options', async (done) => {
    // set document to return when fetching list
    mockingoose(Team).toReturn([teamDoc], 'find');
    // get teams
    const teams = await Repo.list({ search: 'One', fields: ['nane'] });
    // check result
    expect(teams).toBeDefined();
    expect(teams.length).toBeDefined();
    expect(teams.length).toBe(1);
    expect(teams[0]).toBeDefined();
    expect(teams[0].name).toBe(teamDoc.name);
    // end test
    done();
  });

  it('should return a list and ignore fiels if not an array of strings', async (done) => {
    // set document to return when fetching list
    mockingoose(Team).toReturn([teamDoc], 'find');
    // get teams
    const teams = await Repo.list({ search: 'One', fields: null });
    // check result
    expect(teams).toBeDefined();
    expect(teams.length).toBeDefined();
    expect(teams.length).toBe(1);
    expect(teams[0]).toBeDefined();
    expect(teams[0].name).toBe(teamDoc.name);
    // end test
    done();
  });
});

describe('<TeamRepository.findById>', () => {
  // reseet mockinggoose per test
  beforeEach(() => mockingoose(Team).toReturn(null, 'findOne'));

  it('should return a team', async (done) => {
    // set document to return when fetching list
    mockingoose(Team).toReturn(teamDoc, 'findOne');
    // get team
    const team = await Repo.findById(teamDoc._id);
    // check result
    expect(team).toBeDefined();
    expect(team._id).toBe(teamDoc._id);
    expect(team.name).toBe(teamDoc.name);
    expect(team.logo).toBe(teamDoc.logo);
    expect(team.stadium).toBe(teamDoc.stadium);
    // end test
    done();
  });

  it('should fail when team is not found', async (done) => {
    try {
      // get team
      await Repo.findById(teamDoc._id);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toMatch(/not found/);
      // end test
      done();
    }
  });

  it('should fail when id is not passed', async (done) => {
    try {
      // get team
      await Repo.findById();
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toMatch(/without an ID/);
      // end test
      done();
    }
  });
});

describe('<TeamRepository.create>', () => {
  // reseet mockinggoose per test
  beforeEach(() =>  mockingoose(Team).toReturn(teamDoc, 'save'));

  it('should return a created team', async (done) => {
    // create new team
    const team = await Repo.create(teamDoc);
    // check result
    expect(team).toBeDefined();
    expect(team._id).toBe(teamDoc._id);
    expect(team.name).toBe(teamDoc.name);
    expect(team.logo).toBe(teamDoc.logo);
    expect(team.stadium).toBe(teamDoc.stadium);
    // end test
    done();
  });

  it('should return a created team even when logo is not defined', async (done) => {
    mockingoose(Team).toReturn({...teamDoc, logo: null}, 'save');
    // create new team
    const team = await Repo.create({...teamDoc, logo: null});
    // check result
    expect(team).toBeDefined();
    expect(team._id).toBe(teamDoc._id);
    expect(team.name).toBe(teamDoc.name);
    expect(team.logo).toBe(null);
    expect(team.stadium).toBe(teamDoc.stadium);
    // end test
    done();
  });

  it('should fail if incorrect create data is passed', async (done) => {
    try {
      // create new team
      await Repo.create({...teamDoc, logo: invalidLogo });
    } catch (error) {
      // check result
      expect(error).toBeDefined();
      expect(error.errors).toBeDefined();
      expect(error.errors.logo).toBeDefined();
      // end test
      done();
    }
  });

  it('should throw an error if nothing is passed to create method', async (done) => {
    try {
      // create new team
      await Repo.create();
    } catch (error) {
      // check result
      expect(error).toBeDefined();
      expect(error.message).toMatch(/destructure/);
      // end test
      done();
    }
  });
});



describe('<TeamRepository.update>', () => {
  // reseet mockinggoose per test
  beforeEach(() => {
    // set default data to return
    mockingoose(Team).toReturn(teamDoc, 'findOne');
    mockingoose(Team).toReturn(teamDoc, 'save');
  });

  it('should return the updated team', async (done) => {
    mockingoose(Team).toReturn({ ...teamDoc, name: 'Team 2' }, 'save');
    // update existing team
    const team = await Repo.update(teamDoc._id, teamDoc);
    // check result
    expect(team).toBeDefined();
    expect(team._id).toBe(teamDoc._id);
    expect(team.name).toBe('Team 2');
    expect(team.stadium).toBe(teamDoc.stadium);
    expect(team.logo).toBe(teamDoc.logo);
    // end test
    done();
  });

  it('should fail if incorrect update data is passed', async (done) => {
    try {
      // update existing team
      await Repo.update(teamDoc._id, { logo: invalidLogo });
    } catch (error) {
      // check result
      expect(error).toBeDefined();
      expect(error.errors).toBeDefined();
      expect(error.errors.logo).toBeDefined();
      // end test
      done();
    }
  });

  it('should pass if no info is passed to update', async (done) => {
    // update existing team
    const team = await Repo.update(teamDoc._id, {});
    // check result
    expect(team).toBeDefined();
    expect(team._id).toBe(teamDoc._id);
    // end test
    done();
  });

  it('should throw type error if update data is not passed', async (done) => {
    try {
      // try updating team
      await Repo.update(teamDoc._id);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.name).toBe('TypeError');
      // end test
      done();
    }
  });

  it('should throw type error if team ID is not passed', async (done) => {
    try {
      // try updating team
      await Repo.update(null, { name: 'Team 2' });
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toMatch(/update team without an ID/);
      // end test
      done();
    }
  });

  it('should throw type error if team ID is not passed', async (done) => {
    mockingoose(Team).toReturn(null, 'findOne');
    try {
      // try updating team
      await Repo.update(teamDoc._id, { name: 'Team 2' });
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toMatch(/not found/);
      // end test
      done();
    }
  });
});

describe('<TeamRepository.delete>', () => {
  // reset mockingoose
  beforeEach(() => {
    mockingoose(Team).reset();
    mockingoose(Team).toReturn(teamDoc, 'findOne');
  });

  it('should delete a team', async (done) => {
    // set set count for deletion
    mockingoose(Team).toReturn({ deletedCount: 1 }, 'deleteOne');
    // expect deleted count to be one
    expect(await Repo.delete(teamDoc._id)).toBeTruthy();
    done();
  });

  it('should fail if team was not found', async (done) => {
    // set set count for deletion
    mockingoose(Team).toReturn(null, 'findOne');
    try {
      // delete Team
      await Repo.delete(teamDoc._id);
    } catch (error) {
      // expect deleted tount to be one
      expect(error).toBeDefined();
      expect(error.message).toMatch(/not found/);
      done();
    }
  });

  it('should fail if team ID is not passed', async (done) => {
    try {
      // delete Team
      await Repo.delete();
    } catch (error) {
      // expect deleted tount to be one
      expect(error).toBeDefined();
      expect(error.message).toMatch(/delete team without an ID/);
      done();
    }
  });
});