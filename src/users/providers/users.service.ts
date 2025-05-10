import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';

import { CreateUserDto } from '../dtos/create-user.dto';
import { CreateUserProvider } from './create-user.provider';
import ManyUsersProvider from './many-users.provider';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';
import { FindOneByEmailProvider } from './find-one-by-email.provider';
import { DeleteUserProvider } from './delete-user.provider';
import { DeleteUserResponse } from '../interfaces/delete-user.interface';
import { FindOneByIdProvider } from './find-one-by-id.provider';
import { GoogleUser } from '../interfaces/google-user.interface';
import { CreateGoogleUserProvider } from './create-google-user.provider';

/**
 * Class that handles the users service
 */
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly createUserProvider: CreateUserProvider,

    private readonly manyUsersProvider: ManyUsersProvider,

    private readonly findOneByEmailProvider: FindOneByEmailProvider,

    private readonly deleteUserProvider: DeleteUserProvider,

    private readonly findOneByIdProvider: FindOneByIdProvider,

    private readonly createGoogleUserProvider: CreateGoogleUserProvider,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    return this.createUserProvider.createUser(createUserDto);
  }

  public async createManyUsers(createManyUsersDto: CreateManyUsersDto) {
    return this.manyUsersProvider.createManyUsers(createManyUsersDto);
  }

  public async findAll(limit: number, page: number) {
    try {
      const users = await this.userRepository.find();
      return users;
    } catch (error) {
      throw new RequestTimeoutException('Unable to process the request', {
        cause: error,
        description: 'Error finding the users',
      });
    }
  }

  public async findOneById(id: number): Promise<User> {
    return this.findOneByIdProvider.findOneById(id);
  }

  public async findOneByEmail(email: string): Promise<User> {
    return this.findOneByEmailProvider.findOneByEmail(email);
  }

  public async deleteUser(id: number): Promise<DeleteUserResponse> {
    return this.deleteUserProvider.deleteUser(id);
  }

  public async findOneByGoogleId(googleId: string) {
    return this.userRepository.findOneBy({ googleId });
  }

  public async createGoogleUser(googleUser: GoogleUser) {
    return this.createGoogleUserProvider.createGoogleUser(googleUser);
  }
}
