const mockingoose = require('mockingoose').default;
const Repo = require('../../app/repositories/Season.repository');
const Season = require('../../app/models/Season.model');
const Fixture = require('../../app/models/Fixture.model');
const { seasonDoc } = require('../stubs/mock-data.season');

describe('<SeasonRepository.list>', () => {
  // reseet mockinggoose per test
  beforeEach(() => mockingoose(Season).reset());

  it('should return a list without options', async (done) => {
    // set document to return when fetching list
    mockingoose(Season).toReturn([seasonDoc], 'find');
    // get seasons
    const seasons = await Repo.list();
    // check result
    expect(seasons).toBeDefined();
    expect(seasons.length).toBeDefined();
    expect(seasons.length).toBe(1);
    expect(seasons[0]).toBeDefined();
    expect(seasons[0].name).toBe(seasonDoc.name);
    // end test
    done();
  });

  it('should return a list with search option', async (done) => {
    // set document to return when fetching list
    mockingoose(Season).toReturn([seasonDoc], 'find');
    // get seasons
    const seasons = await Repo.list({ search: 'One' });
    // check result
    expect(seasons).toBeDefined();
    expect(seasons.length).toBeDefined();
    expect(seasons.length).toBe(1);
    expect(seasons[0]).toBeDefined();
    expect(seasons[0].name).toBe(seasonDoc.name);
    // end test
    done();
  });
});

describe('<SeasonRepository.findById>', () => {
  // reseet mockinggoose per test
  beforeEach(() => mockingoose(Season).reset());

  it('should return a season', async (done) => {
    // set document to return when fetching list
    mockingoose(Season).toReturn(seasonDoc, 'findOne');
    // get season
    const season = await Repo.findById(seasonDoc._id);
    // check result
    expect(season).toBeDefined();
    expect(season._id).toBe(seasonDoc._id);
    expect(season.name).toBe(seasonDoc.name);
    expect(new Date(season.startDate).getTime()).toBe(new Date(seasonDoc.startDate).getTime());
    expect(new Date(season.endDate).getTime()).toBe(new Date(seasonDoc.endDate).getTime());
    // end test
    done();
  });

  it('should fail when season is not found', async (done) => {
    // set document to return when fetching list
    mockingoose(Season).toReturn(null, 'findOne');
    try {
      // get season
      await Repo.findById(seasonDoc._id);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toMatch(/not found/);
      // end test
      done();
    }
  });

  it('should fail when id is not passed', async (done) => {
    // set document to return when fetching list
    mockingoose(Season).toReturn(null, 'findOne');
    try {
      // get season
      await Repo.findById();
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toMatch(/without an ID/);
      // end test
      done();
    }
  });
});

describe('<SeasonRepository.create>', () => {
  // reseet mockinggoose per test
  beforeEach(() => mockingoose(Season).reset());

  it('should return a created season', async (done) => {
    // set dodument to return
    mockingoose(Season).toReturn(seasonDoc, 'save');
    // create new season
    const season = await Repo.create(seasonDoc);
    // check result
    expect(season).toBeDefined();
    expect(season._id).toBe(seasonDoc._id);
    expect(season.name).toBe(seasonDoc.name);
    expect(new Date(season.startDate).getTime()).toBe(new Date(seasonDoc.startDate).getTime());
    expect(new Date(season.endDate).getTime()).toBe(new Date(seasonDoc.endDate).getTime());
    // end test
    done();
  });

  it('should fail if incorrect data is passed', async (done) => {
    // set dodument to return
    mockingoose(Season).toReturn(seasonDoc, 'save');
    try {
      // create new season
      await Repo.create({ startDate: 'a date' });
    } catch (error) {
      // check result
      expect(error).toBeDefined();
      expect(error.errors).toBeDefined();
      // end test
      done();
    }
  });

  it('should throw an error if nothing is passed to create method', async (done) => {
    // set dodument to return
    mockingoose(Season).toReturn(seasonDoc, 'save');
    try {
      // create new season
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



describe('<SeasonRepository.update>', () => {
  // reseet mockinggoose per test
  beforeEach(() => {
    // set default data to return
    mockingoose(Season).toReturn(seasonDoc, 'findOne');
    mockingoose(Season).toReturn(seasonDoc, 'save');
  });

  it('should return the updated season', async (done) => {
    mockingoose(Season).toReturn({...seasonDoc, name: 'Season Two'}, 'save');
    // update existing season
    const season = await Repo.update(seasonDoc._id, seasonDoc);
    // check result
    expect(season).toBeDefined();
    expect(season._id).toBe(seasonDoc._id);
    expect(season.name).toBe('Season Two');
    expect(new Date(season.startDate).getTime()).toBe(new Date(seasonDoc.startDate).getTime());
    expect(new Date(season.endDate).getTime()).toBe(new Date(seasonDoc.endDate).getTime());
    // end test
    done();
  });

  it('should fail if incorrect data is passed', async (done) => {
    try {
      // update existing season
      await Repo.update(seasonDoc._id, { startDate: 'a date' });
    } catch (error) {
      // check result
      expect(error).toBeDefined();
      expect(error.errors).toBeDefined();
      expect(error.errors.startDate).toBeDefined();
      // end test
      done();
    }
  });

  it('should pass if no info is passed to update', async (done) => {
    // update existing season
    const season = await Repo.update(seasonDoc._id, {});
    // check result
    expect(season).toBeDefined();
    expect(season._id).toBe(seasonDoc._id);
    // end test
    done();
  });

  it('should throw type error if update data is not passed', async (done) => {
    try{
      // try updating season
      await Repo.update(seasonDoc._id);
    }catch(error){
      expect(error).toBeDefined();
      expect(error.name).toBe('TypeError');
      // end test
      done();
    }
  });

  it('should throw type error if season ID is not passed', async (done) => {
    try{
      // try updating season
      await Repo.update(null, {name: 'Season Two'});
    }catch(error){
      expect(error).toBeDefined();
      expect(error.message).toMatch(/update season without an ID/);
      // end test
      done();
    }
  });

  it('should throw type error if season ID is not passed', async (done) => {
    mockingoose(Season).toReturn(null, 'findOne');
    try{
      // try updating season
      await Repo.update(seasonDoc._id, {name: 'Season Two'});
    }catch(error){
      expect(error).toBeDefined();
      expect(error.message).toMatch(/not found/);
      // end test
      done();
    }
  });
});

describe('<SeasonRepository.delete>', () => {
  // reset mockingoose
  beforeEach(() =>  {
    mockingoose(Season).reset();
    mockingoose(Season).toReturn(seasonDoc, 'findOne');
    mockingoose(Fixture).toReturn({deletedCount: 0}, 'deleteMany');
  });

  it('should delete a season',  async (done) => {
    // set set count for deletion
    mockingoose(Season).toReturn({deletedCount: 1}, 'deleteOne');
    // expect deleted count to be one
    expect(await Repo.delete(seasonDoc._id)).toBeTruthy();
    done();
  });

  it('should fail if season was not found',  async (done) => {
    // set set count for deletion
    mockingoose(Season).toReturn(null, 'findOne');
    try{
      // delete Season
      await Repo.delete(seasonDoc._id);
    } catch(error){
      // expect deleted tount to be one
      expect(error).toBeDefined();
      expect(error.message).toMatch(/not found/);
      done();
    }
  });

  it('should fail if season ID is not passed',  async (done) => {
    try{
      // delete Season
      await Repo.delete();
    } catch(error){
      // expect deleted tount to be one
      expect(error).toBeDefined();
      expect(error.message).toMatch(/delete season without an ID/);
      done();
    }
  });
});