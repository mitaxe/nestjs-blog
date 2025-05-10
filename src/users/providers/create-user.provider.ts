import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { MailService } from 'src/mail/providers/mail.service';

@Injectable()
export class CreateUserProvider {
  constructor(
    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly mailService: MailService,
  ) {}
  /**
   * Creates a new user
   * @param createUserDto - The DTO for the create user
   * @returns The created user
   */
  public async createUser(createUserDto: CreateUserDto) {
    let existingUser: User | null;

    try {
      existingUser = await this.userRepository.findOne({
        where: {
          email: createUserDto.email,
        },
      });
    } catch (error) {
      throw new RequestTimeoutException('Unable to process the request', {
        cause: error,
        description: 'Error connecting to the database',
      });
    }

    // If the user already exists, throw an error
    if (existingUser) {
      throw new BadRequestException(
        'The user already exists. Please use a different email address.',
        {
          description: 'The user already exists',
          cause: existingUser,
        },
      );
    }

    // Create a new user
    const hashedPassword = await this.hashingProvider.hash(
      createUserDto.password,
    );
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    try {
      await this.userRepository.save(user);
    } catch (error) {
      throw new RequestTimeoutException('Unable to process the request', {
        cause: error,
        description: 'Error creating the user',
      });
    }

    try {
      await this.mailService.sendWelcomeEmail(user);
    } catch (error) {
      console.error('Unable to send the welcome email', error);
      throw new RequestTimeoutException('Unable to send the welcome email', {
        cause: error,
      });
    }
  }
}
