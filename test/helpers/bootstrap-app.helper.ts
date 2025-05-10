import { TestingModule } from '@nestjs/testing';

import { ConfigModule } from '@nestjs/config';

import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';

import { appCreate } from 'src/app.create';

export const bootstrapApplication = async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule, ConfigModule],
  }).compile();

  const app = moduleFixture.createNestApplication();

  appCreate(app);
  await app.init();

  return app;
};
