const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const monsters = require('../lib/models/Monster');

describe('Express-Api routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });
});

it('creates a monster', async () => {
  const expected = {
    name: 'Blubber',
    type: 'Goo',
    size: 2,
  };
  const res = await (await request(app).post('/api/v1/monsters')).send(expected);

  expect(res.body).toEqual({ id: expect.any(String), ...expected });
});
