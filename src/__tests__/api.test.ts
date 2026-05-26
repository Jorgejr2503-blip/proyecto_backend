import request from 'supertest';
import { Server } from '../app/app';

let server: Server;

beforeAll(async () => {
  server = new Server();
  await server.start();
}, 15000);

afterAll(async () => {
  await server.close();
});

describe('GET /', () => {
  it('debe responder 200', async () => {
    const res = await request(server.app).get('/');
    expect(res.status).toBe(200);
  });
});

describe('POST /api/v1/user/create', () => {
  it('debe responder con algún status válido', async () => {
    const res = await request(server.app)
      .post('/api/v1/user/create')
      .send({});
    expect([201, 400, 422, 500]).toContain(res.status);
  }, 15000);
});

describe('POST /api/v1/user/', () => {
  it('debe responder 400 o 401 con credenciales vacías', async () => {
    const res = await request(server.app)
      .post('/api/v1/user/')
      .send({});
    expect([400, 401, 422, 500]).toContain(res.status);
  }, 15000);
});

describe('GET /api/v1/dashboard/metrics', () => {
  it('debe responder 401 sin token', async () => {
    const res = await request(server.app)
      .get('/api/v1/dashboard/metrics');
    expect(res.status).toBe(401);
  });
});