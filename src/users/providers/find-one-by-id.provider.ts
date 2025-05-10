import { Injectable, RequestTimeoutException, NotFoundException } from '@nestjs/common';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindOneByIdProvider {
  findOneByGoogleId(googleId: string): User | PromiseLike<User> {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async findOneById(id: number): Promise<User> {
    let user: User | null;
    try {
      user = await this.userRepository.findOneBy({ id });
    } catch (error) {
      throw new RequestTimeoutException('Unable to process the request', {
        cause: error,
        description: 'Error finding the user',
      });
    }

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
