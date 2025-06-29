import request from 'supertest';
import app from '../src/app.js';

describe('GET /api/mars/pictures', () => {
  it('should return Mars photos', async () => {
    const res = await request(app).get('/api/mars/pictures');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.photos)).toBe(true);
  });
});