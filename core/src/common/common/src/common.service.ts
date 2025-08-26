import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {
  getValue() {
    return 'Shared service value';
  }
}
