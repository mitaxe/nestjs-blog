import { SetMetadata } from '@nestjs/common';
import { AuthType } from '../enums/auth-types.enums';
import { AUTH_TYPE_KEY } from '../constants/auth.constants';

export const Auth = (...authType: AuthType[]) =>
  SetMetadata(AUTH_TYPE_KEY, authType);
