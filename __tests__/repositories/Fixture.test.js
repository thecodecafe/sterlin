const mongoose = require('mongoose');
const mockingoose = require('mockingoose').default;
const Repo = require('../../app/repositories/Fixture.repository');
const Fixture = require('../../app/models/Fixture.model');
const Team = require('../../app/models/Team.model');
const { fixtureDoc, newfixtureDoc, updatedfixtureDoc } = require('../stubs/mock-data.fixture');

describe('<FixtureRepository.list>', () => {
  // reseet mockinggoose per test
  beforeEach(() => mockingoose(Fixture).reset());

  it('should return a list without options', async (done) => {
    // set document to return when fetching list
    mockingoose(Fixture).toReturn([fixtureDoc], 'find');
    // get fixtures
    const fixtures = await Repo.list();
    // check result
    expect(fixtures).toBeDefined();
    expect(fixtures.length).toBeDefined();
    expect(fixtures.length).toBe(1);
    expect(fixtures[0]).toBeDefined();
    expect(new Date(fixtures[0].startsAt).getTime()).toBe(new Date(fixtureDoc.startsAt).getTime());
    // end test
    done();
  });

  it('should return a list with date range options', async (done) => {
    // set document to return when fetching list
    mockingoose(Fixture).toReturn([fixtureDoc], 'find');
    const now = new Date().toUTCString();
    // get fixtures
    const fixtures = await Repo.list({ from: now, to: now });
    // check result
    expect(fixtures).toBeDefined();
    expect(fixtures.length).toBeDefined();
    expect(fixtures.length).toBe(1);
    expect(fixtures[0]).toBeDefined();
    expect(new Date(fixtures[0].startsAt).getTime()).toBe(new Date(fixtureDoc.startsAt).getTime());
    // end test
    done();
  });

  it('should return a list with search options', async (done) => {
    // set document to return when fetching list
    mockingoose(Fixture).toReturn([fixtureDoc], 'find');
    mockingoose(Team).toReturn([{ _id: new mongoose.Types.ObjectId() }], 'find');
    // get fixtures
    const fixtures = await Repo.list({ search: 'Chelsea' });
    // check result
    expect(fixtures).toBeDefined();
    expect(fixtures.length).toBeDefined();
    expect(fixtures.length).toBe(1);
    expect(fixtures[0]).toBeDefined();
    expect(new Date(fixtures[0].startsAt).getTime()).toBe(new Date(fixtureDoc.startsAt).getTime());
    // end test
    done();
  });

  it('should return completed list', async (done) => {
    // set document to return when fetching list
    mockingoose(Fixture).toReturn([fixtureDoc], 'find');
    mockingoose(Team).toReturn([{ _id: new mongoose.Types.ObjectId() }], 'find');
    // get fixtures
    const fixtures = await Repo.list({ status: 'completed' });
    // check result
    expect(fixtures).toBeDefined();
    expect(fixtures.length).toBeDefined();
    expect(fixtures.length).toBe(1);
    expect(fixtures[0]).toBeDefined();
    expect(new Date(fixtures[0].startsAt).getTime()).toBe(new Date(fixtureDoc.startsAt).getTime());
    // end test
    done();
  });

  it('should return pending list', async (done) => {
    // set document to return when fetching list
    mockingoose(Fixture).toReturn([fixtureDoc], 'find');
    mockingoose(Team).toReturn([{ _id: new mongoose.Types.ObjectId() }], 'find');
    // get fixtures
    const fixtures = await Repo.list({ status: 'pending' });
    // check result
    expect(fixtures).toBeDefined();
    expect(fixtures.length).toBeDefined();
    expect(fixtures.length).toBe(1);
    expect(fixtures[0]).toBeDefined();
    expect(new Date(fixtures[0].startsAt).getTime()).toBe(new Date(fixtureDoc.startsAt).getTime());
    // end test
    done();
  });

  it('should return ongoing list', async (done) => {
    // set document to return when fetching list
    mockingoose(Fixture).toReturn([fixtureDoc], 'find');
    mockingoose(Team).toReturn([{ _id: new mongoose.Types.ObjectId() }], 'find');
    // get fixtures
    const fixtures = await Repo.list({ status: 'ongoing' });
    // check result
    expect(fixtures).toBeDefined();
    expect(fixtures.length).toBeDefined();
    expect(fixtures.length).toBe(1);
    expect(fixtures[0]).toBeDefined();
    expect(new Date(fixtures[0].startsAt).getTime()).toBe(new Date(fixtureDoc.startsAt).getTime());
    // end test
    done();
  });

  it('should return a list and ignore fiels if not an array of strings', async (done) => {
    // set document to return when fetching list
    mockingoose(Fixture).toReturn([fixtureDoc], 'find');
    // get fixtures
    const fixtures = await Repo.list({ fields: null });
    // check result
    expect(fixtures).toBeDefined();
    expect(fixtures.length).toBeDefined();
    expect(fixtures.length).toBe(1);
    expect(fixtures[0]).toBeDefined();
    expect(new Date(fixtures[0].startsAt).getTime()).toBe(new Date(fixtureDoc.startsAt).getTime());
    // end test
    done();
  });
});

describe('<FixtureRepository.findById>', () => {
  // reseet mockinggoose per test
  beforeEach(() => mockingoose(Fixture).toReturn(null, 'findOne'));

  it('should return a fixture', async (done) => {
    // set document to return when fetching list
    mockingoose(Fixture).reset();
    mockingoose(Fixture).toReturn(fixtureDoc, 'findOne');
    // get fixture
    const fixture = await Repo.findById(fixtureDoc._id);
    // check result
    expect(fixture).toBeDefined();
    expect(fixture._id).toBe(fixtureDoc._id);
    // end test
    done();
  });

  it('should fail when fixture is not found', async (done) => {
    try {
      // get fixture
      await Repo.findById(fixtureDoc._id);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toMatch(/not found/);
      // end test
      done();
    }
  });

  it('should fail when id is not passed', async (done) => {
    try {
      // get fixture
      await Repo.findById();
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toMatch(/without an ID/);
      // end test
      done();
    }
  });
});

describe('<FixtureRepository.create>', () => {
  // reseet mockinggoose per test
  beforeEach(() => mockingoose(Fixture).toReturn(newfixtureDoc, 'save'));

  it('should return a created fixture', async (done) => {
    // create new fixture
    const fixture = await Repo.create(newfixtureDoc);
    const endsAt = new Date(fixtureDoc.startsAt).getTime() + (60000 * 100)
    // check result
    expect(fixture).toBeDefined();
    expect(fixture._id).toBe(fixtureDoc._id);
    expect(new Date(fixture.endsAt).getTime()).toBe(endsAt);
    expect(fixture.homeGoals).toBe(0);
    expect(fixture.awayGoals).toBe(0);
    // end test
    done();
  });

  it('should fail if incorrect create data is passed', async (done) => {
    try {
      // create new fixture
      await Repo.create({ ...fixtureDoc, startsAt: 'foo' });
    } catch (error) {
      // check result
      expect(error).toBeDefined();
      expect(error.errors).toBeDefined();
      expect(error.errors.startsAt).toBeDefined();
      expect(error.errors.endsAt).toBeDefined();
      // end test
      done();
    }
  });

  it('should throw an error if nothing is passed to create method', async (done) => {
    try {
      // create new fixture
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



describe('<FixtureRepository.update>', () => {
  // reseet mockinggoose per test
  beforeEach(() => {
    // set default data to return
    mockingoose(Fixture).toReturn(updatedfixtureDoc, 'findOne');
    mockingoose(Fixture).toReturn(updatedfixtureDoc, 'save');
  });

  it('should return the updated fixture', async (done) => {
    mockingoose(Fixture).toReturn(updatedfixtureDoc, 'save');
    mockingoose(Fixture).toReturn(updatedfixtureDoc, 'findOne');
    // update existing fixture
    const fixture = await Repo.update(fixtureDoc._id, updatedfixtureDoc);
    const endsAt = new Date(fixture.startsAt).getTime() + (60000 * 100)
    // check result
    expect(fixture).toBeDefined();
    expect(fixture._id).toBe(fixtureDoc._id);
    expect(new Date(fixture.endsAt).getTime()).toBe(endsAt);
    expect(fixture.homeGoals).toBe(updatedfixtureDoc.homeGoals);
    expect(fixture.awayGoals).toBe(updatedfixtureDoc.awayGoals);
    // end test
    done();
  });

  it('should fail if incorrect update data is passed', async (done) => {
    try {
      // update existing fixture
      await Repo.update(fixtureDoc._id, { startsAt: 'date' });
    } catch (error) {
      // check result
      expect(error).toBeDefined();
      expect(error.errors).toBeDefined();
      expect(error.errors.startsAt).toBeDefined();
      expect(error.errors.endsAt).toBeDefined();
      // end test
      done();
    }
  });

  it('should pass if empty info is passed to update', async (done) => {
    // update existing fixture
    const fixture = await Repo.update(fixtureDoc._id, {});
    // check result
    expect(fixture).toBeDefined();
    expect(fixture._id).toBe(fixtureDoc._id);
    // end test
    done();
  });

  it('should throw type error if update data is not passed', async (done) => {
    try {
      // try updating fixture
      await Repo.update(fixtureDoc._id);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.name).toBe('TypeError');
      // end test
      done();
    }
  });

  it('should throw type error if fixture ID is not passed', async (done) => {
    try {
      // try updating fixture
      await Repo.update(null, { name: 'Fixture 2' });
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toMatch(/update fixture without an ID/);
      // end test
      done();
    }
  });

  it('should throw type error if fixture ID is not passed', async (done) => {
    mockingoose(Fixture).toReturn(null, 'findOne');
    try {
      // try updating fixture
      await Repo.update(fixtureDoc._id, { name: 'Fixture 2' });
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toMatch(/not found/);
      // end test
      done();
    }
  });
});

describe('<FixtureRepository.delete>', () => {
  // reset mockingoose
  beforeEach(() => {
    mockingoose(Fixture).reset();
    mockingoose(Fixture).toReturn(fixtureDoc, 'findOne');
  });

  it('should delete a fixture', async (done) => {
    // set set count for deletion
    mockingoose(Fixture).toReturn({ deletedCount: 1 }, 'deleteOne');
    // expect deleted count to be one
    expect(await Repo.delete(fixtureDoc._id)).toBeTruthy();
    done();
  });

  it('should fail if fixture was not found', async (done) => {
    // set set count for deletion
    mockingoose(Fixture).toReturn(null, 'findOne');
    try {
      // delete Fixture
      await Repo.delete(fixtureDoc._id);
    } catch (error) {
      // expect deleted tount to be one
      expect(error).toBeDefined();
      expect(error.message).toMatch(/not found/);
      done();
    }
  });

  it('should fail if fixture ID is not passed', async (done) => {
    try {
      // delete Fixture
      await Repo.delete();
    } catch (error) {
      // expect deleted tount to be one
      expect(error).toBeDefined();
      expect(error.message).toMatch(/delete fixture without an ID/);
      done();
    }
  });
});