import { HttpException, HttpStatus } from '@nestjs/common';

export class DatabaseException extends HttpException {
  constructor() {
    super('Database Exception', HttpStatus.BAD_REQUEST);
  }
}
