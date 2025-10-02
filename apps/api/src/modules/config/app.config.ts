import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfig {
  readonly logger = new Logger('ToolJockey');

  constructor(private readonly config: ConfigService) {}

  get nodeEnv(): string {
    return this.config.get<string>('app.nodeEnv', 'development');
  }

  get s3() {
    return this.config.get('app.s3');
  }

  get redis() {
    return this.config.get('app.redis');
  }

  get oidc() {
    return this.config.get('app.oidc');
  }

  get web() {
    return this.config.get('app.web');
  }
}
