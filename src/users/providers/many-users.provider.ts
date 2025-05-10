import {
  BadRequestException,
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { User } from '../user.entity';
import { DataSource, QueryRunner } from 'typeorm';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';

@Injectable()
export default class ManyUsersProvider {
  constructor(private readonly dataSource: DataSource) {}

  public async createManyUsers(createManyUsersDto: CreateManyUsersDto) {
    const newUsers: User[] = [];
    let queryRunner: QueryRunner;
    queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
    } catch (err) {
      throw new RequestTimeoutException('Unable to process the request');
    }

    try {
      for (const user of createManyUsersDto.users) {
        const newUser = queryRunner.manager.create(User, user);
        await queryRunner.manager.save(User, newUser);

        newUsers.push(newUser);
      }

      await queryRunner.commitTransaction();
      return newUsers;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new ConflictException('Could not complete the transaction', {
        description: String(err),
        cause: err,
      });
    } finally {
      await queryRunner.release().catch((err) => {
        throw new RequestTimeoutException('Unable to process the request', {
          cause: err,
        });
      });
    }
  }
}
