import {
  ConflictException,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { User } from '../user.entity';
import { DeleteUserResponse } from '../interfaces/delete-user.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneByIdProvider } from './find-one-by-id.provider';

@Injectable()
export class DeleteUserProvider {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly findOneByIdProvider: FindOneByIdProvider,
  ) {}

  public async deleteUser(id: number): Promise<DeleteUserResponse> {
    let user: User | null;
    try {
      user = await this.findOneByIdProvider.findOneById(id);
    } catch (error) {
      throw new RequestTimeoutException('Unable to process the request', {
        cause: error,
        description: 'Error deleting the user',
      });
    }

    if (!user) {
      throw new NotFoundException('User not found');
    }

    try {
      await this.userRepository.delete(user.id);
      return {
        deleted: true,
        user,
      };
    } catch (error) {
      throw new ConflictException('Unable to delete the user', {
        cause: error,
        description: 'Error deleting the user',
      });
    }
  }
}
