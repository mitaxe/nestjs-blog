import {
  forwardRef,
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import jwtConfig from 'src/auth/config/jwt.config';
import { GoogleTokenDto } from '../dtos/google-token.dto';
import { UsersService } from 'src/users/providers/users.service';
import { GenerateTokensProvider } from 'src/auth/providers/generate-tokens.provider';

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
  private oauthClient: OAuth2Client;

  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly generateTokensProvider: GenerateTokensProvider,
  ) {}

  onModuleInit() {
    const googleClientId = this.jwtConfiguration.googleClientId;
    const googleClientSecret = this.jwtConfiguration.googleClientSecret;
    this.oauthClient = new OAuth2Client(googleClientId, googleClientSecret);
  }

  public async authenticate(googleTokenDto: GoogleTokenDto) {
    try {
      const { token } = googleTokenDto;
      const ticket = await this.oauthClient.verifyIdToken({
        idToken: token,
        audience: this.jwtConfiguration.googleClientId,
      });

      const {
        sub: googleId,
        email,
        given_name: firstName,
        family_name: lastName,
      } = ticket.getPayload() ?? {};

      if (googleId) {
        const user = await this.usersService.findOneByGoogleId(googleId);

        if (user) {
          return this.generateTokensProvider.generateTokens(user);
        }

        const newUser = await this.usersService.createGoogleUser({
          email: email ?? '',
          googleId,
          firstName: firstName ?? '',
          lastName: lastName ?? '',
        });

        return this.generateTokensProvider.generateTokens(newUser);
      }
    } catch (error) {
      throw new UnauthorizedException(error, {
        description: 'Invalid google token',
      });
    }
  }
}
