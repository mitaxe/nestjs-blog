import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

export const dropDatabase = async (
  configService: ConfigService,
): Promise<void> => {
  const AppDataSource = new DataSource({
    type: 'postgres',
    host: configService.get('database.host'),
    port: configService.get('database.port'),
    username: configService.get('database.username'),
    password: configService.get('database.password'),
    database: configService.get('database.database'),
    synchronize: configService.get('database.synchronize'),
  });

  await AppDataSource.initialize();
  await AppDataSource.dropDatabase();
  await AppDataSource.destroy();
};
