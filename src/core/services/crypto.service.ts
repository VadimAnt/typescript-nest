import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CryptoService {
  async hash(data: string) {
    return bcrypt.hash(data, 10);
  }
  async compare(password: string, encryptPassword: string) {
    return bcrypt.compare(password, encryptPassword);
  }
}