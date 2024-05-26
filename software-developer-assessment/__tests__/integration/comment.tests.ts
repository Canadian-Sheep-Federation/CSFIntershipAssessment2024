import request from 'supertest';
import { API_PREFIX, Comment } from '../../src/comment';
import { app } from '../../src';
import http from 'http';
import sqlite3 from 'sqlite3';

jest.useFakeTimers();

describe('Comment Routes', () => {
  const db = new sqlite3.Database('dummy-database.db');
  let testServer: http.Server;

  beforeAll((done) => {
    testServer = app.listen(3000, () => done());
  });

  afterAll((done) => {
    testServer.close(() => done());
  });

  beforeEach((done) => {
    db.serialize(() => {
      db.run('DELETE FROM comment;', (err) => {
        if (err) {
          console.error('error truncating table: ', err);
        }
      });
    });

    db.serialize(() => {
      db.run(`DELETE FROM SQLITE_SEQUENCE WHERE name='comment';`, (err) => {
        if (err) {
          console.error('error truncating table: ', err);
        }
        done();
      });
    });
  });

  it('should create a new comment', async () => {
    const dto = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      body: 'This is a test comment',
    };

    const post = await request(app)
      .post(`${API_PREFIX}comment`)
      .set('Content-Type', 'application/json')
      .send(dto)
      .expect(201);

    expect(post.body.message).toBe('comment posted');
  });

  it('should not create a new comment as core payload is missing', async () => {
    const dto = {
      name: 'John Doe',
      body: 'This is a test comment',
    };

    const post = await request(app)
      .post(`${API_PREFIX}comment`)
      .set('Content-Type', 'application/json')
      .send(dto)
      .expect(400);

    expect(post.body.message).toBe('name, email or body is missing');
  });

  it('should not create a new comment as core payload is empty', async () => {
    const dto = {
      name: 'John Doe',
      email: '',
      body: 'This is a test comment',
    };

    const post = await request(app)
      .post(`${API_PREFIX}comment`)
      .set('Content-Type', 'application/json')
      .send(dto)
      .expect(400);

    expect(post.body.message).toBe('name, email or body is missing');
  });

  it('should successfully get a comment by id', async () => {
    const dto = {
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      body: 'This is another test comment',
    };

    await request(app).post(`${API_PREFIX}comment`).send(dto).expect(201);

    // get any id in db
    const comment = await new Promise<Comment | undefined>(
      (resolve, reject) => {
        db.get(
          `SELECT * FROM comment LIMIT 1`,
          (err: any, row: Comment | undefined) => {
            if (err) {
              reject(err);
            } else {
              resolve(row as Comment | undefined);
            }
          },
        );
      },
    );

    const get = await request(app)
      .get(`${API_PREFIX}comment/${comment?.comment_id}`)
      .expect(200);

    expect(get.body).toHaveProperty('name', dto.name);
    expect(get.body).toHaveProperty('email', dto.email);
    expect(get.body).toHaveProperty('body', dto.body);
  });

  it('should not get a comment by id as comment does not exist', async () => {
    const get = await request(app).get(`${API_PREFIX}comment/100`).expect(404);
    expect(get.body.message).toBe('comment not found');
  });

  it('should get all comments', async () => {
    // pre-save
    const dto = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      body: 'This is a test comment',
    };

    await request(app)
      .post(`${API_PREFIX}comment`)
      .set('Content-Type', 'application/json')
      .send(dto)
      .expect(201);

    // request to test
    const get = await request(app).get(`${API_PREFIX}comment`).expect(200);
    const arr = get.body as Comment[];
    expect(arr).toBeDefined();
    expect(arr.length).toEqual(1);
  });
});
