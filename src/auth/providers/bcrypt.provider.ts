import { Injectable } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptProvider implements HashingProvider {
  async hash(value: string | Buffer): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(value, saltRounds);
  }

  async compare(value: string | Buffer, hashedValue: string): Promise<boolean> {
    return bcrypt.compare(value, hashedValue);
  }
}
