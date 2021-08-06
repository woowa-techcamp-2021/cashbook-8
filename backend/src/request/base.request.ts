import { validate } from 'class-validator';
import InvalidDataError from '../errors/invalid-data.error';

class BaseRequest {
  async validate (): Promise<boolean> {
    const errors = await validate(this);
    if (errors.length === 0) {
      return true;
    }

    const message = errors
      .map(error => error.toString())
      .join('\n');

    throw new InvalidDataError(message);
  }
}

export default BaseRequest;
