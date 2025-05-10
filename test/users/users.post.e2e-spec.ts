import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';

import { ConfigService } from '@nestjs/config';
import { dropDatabase } from 'test/helpers/drop-database.helper';
import { bootstrapApplication } from 'test/helpers/bootstrap-app.helper';
import {
  sampleUser,
  missingFirstName,
  missingEmail,
  missingPassword,
} from './users.post.e2e-spec.sample-data';

describe('[Users] @POST Endpoints', () => {
  let app: INestApplication<App>;
  let config: ConfigService;
  let httpServer: App;

  beforeEach(async () => {
    app = await bootstrapApplication();
    config = app.get<ConfigService>(ConfigService);
    httpServer = app.getHttpServer();
  });

  afterEach(async () => {
    await dropDatabase(config);
    await app.close();
  });

  it('/users - Endpoint is public', () => {
    return request(httpServer).post('/users').send(sampleUser).expect(201);
  });

  it('/users - firstName is mandatory', () => {
    return request(httpServer)
      .post('/users')
      .send(missingFirstName)
      .expect(400);
  });

  it('/users - email is mandatory', () => {
    return request(httpServer).post('/users').send(missingEmail).expect(400);
  });

  it('/users - password is mandatory', () => {
    return request(httpServer).post('/users').send(missingPassword).expect(400);
  });

  it('/users - password must not be returned in response', () => {
    return request(httpServer)
      .post('/users')
      .send(sampleUser)
      .expect(201)
      .then(({ body }) => expect(body.password).toBeUndefined());
  });

  it('/users - googleId must not be returned in response', () => {
    return request(httpServer)
      .post('/users')
      .send(sampleUser)
      .expect(201)
      .then(({ body }) => expect(body.googleId).toBeUndefined());
  });
});
