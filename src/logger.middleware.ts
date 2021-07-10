import {
  Inject,
  Injectable,
  LoggerService,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { finished } from 'stream';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, query, body, url } = req;
    const start = Date.now();
    const queryString = JSON.stringify(query);
    const bodyString = JSON.stringify(body);
    next();
    finished(res, () => {
      const ms = Date.now() - start;
      const { statusCode } = res;
      const statusCodeString = statusCode.toString();
      if (
        statusCodeString.startsWith('4') ||
        statusCodeString.startsWith('5')
      ) {
        return;
      }
      const date = new Date().toLocaleString();

      const log = `[${date}]
      ${method} ${url} ${statusCode} [${ms}ms]
      query parameters: ${queryString}
      request body: ${bodyString}\n`;

      this.logger.log(log);
    });
  }
}
