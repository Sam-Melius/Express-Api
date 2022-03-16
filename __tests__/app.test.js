const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Monster = require('../lib/models/Monster');

describe('Express-Api routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });


  it('creates a monster', async () => {
    const expected = {
      name: 'Blubber',
      type: 'Goo',
      size: 2,
    };
    const res = await request(app).post('/api/v1/monsters').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('gets a list', async () => {
    const expected = await Monster.findAll();
    const res = await request(app).get('/api/v1/monsters');

    expect(res.body).toEqual(expected);
  });

  it('gets by id', async () => {
    const expected = await Monster.findById(1);
    const res = await request(app).get(`/api/v1/monsters/${expected.id}`);

    expect(res.body).toEqual(expected);
  });

  it('deletes a monster by id', async () => {
    const expected = await Monster.findById(1);
    const res = await request(app).delete(`/api/v1/monsters/${expected.id}`);

    expect(res.body).toEqual(expected);
  });

  it('updates a monster by id', async () => {
    const expected = {
      id: expect.any(String),
      name: 'Blubber',
      type: 'Goo',
      size: 3
    };
    const res = await request(app)
      .patch('/api/v1/monsters/1')
      .send({ size: 3 });

    expect(res.body).toEqual(expected);
  });

});
