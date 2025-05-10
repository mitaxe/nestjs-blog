import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from '../dtos/sign-in.dto';
import { UsersService } from 'src/users/providers/users.service';
import { HashingProvider } from './hashing.provider';

import { GenerateTokensProvider } from './generate-tokens.provider';

@Injectable()
export class SignInProvider {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    @Inject(HashingProvider)
    private readonly hashingProvider: HashingProvider,

    @Inject(GenerateTokensProvider)
    private readonly generateTokensProvider: GenerateTokensProvider,
  ) {}

  public async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;
    let isPasswordValid = false;
    const user = await this.usersService.findOneByEmail(email);

    if (user.password) {
      isPasswordValid = await this.hashingProvider.compare(
        password,
        user.password,
      );
    }

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { accessToken, refreshToken } =
      await this.generateTokensProvider.generateTokens(user);

    return {
      accessToken,
      refreshToken,
    };
  }
}
