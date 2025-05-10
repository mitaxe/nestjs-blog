import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './providers/users.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ConfigModule } from '@nestjs/config';
import { CreateUserProvider } from './providers/create-user.provider';
import profileConfig from './config/profile.config';
import ManyUsersProvider from './providers/many-users.provider';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { BcryptProvider } from 'src/auth/providers/bcrypt.provider';
import { FindOneByEmailProvider } from './providers/find-one-by-email.provider';
import { DeleteUserProvider } from './providers/delete-user.provider';
import { FindOneByIdProvider } from './providers/find-one-by-id.provider';
import { FindOneByGoogleIdProvider } from './providers/find-one-by-google-id.provider';
import { CreateGoogleUserProvider } from './providers/create-google-user.provider';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    ManyUsersProvider,
    CreateUserProvider,
    { provide: HashingProvider, useClass: BcryptProvider },
    FindOneByEmailProvider,
    DeleteUserProvider,
    FindOneByIdProvider,
    FindOneByGoogleIdProvider,
    CreateGoogleUserProvider,
  ],
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User]),
    ConfigModule.forFeature(profileConfig),
  ],
  exports: [UsersService],
})
export class UsersModule {}
