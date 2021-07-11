import * as fs from 'fs';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { finished } from 'stream';
import { MyLogger } from './logger.service';

if (!fs.existsSync('logs')) {
  fs.mkdirSync('logs');
}

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: MyLogger) {}

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
      const date = new Date().toLocaleString();

      let log: string;

      if (
        statusCodeString.startsWith('4') ||
        statusCodeString.startsWith('5')
      ) {
        log = `
[${date}]
${method} ${url} ${statusCode} [${ms}ms]
${res.statusMessage}`;
        this.logger.error(log);
        fs.appendFile('logs/logs.errors.txt', `${log}\n`, (err: Error) => {
          if (err) {
            console.log(err);
          }
        });
      } else {
        log = `
[${date}]
${method} ${url} ${statusCode} [${ms}ms]
query parameters: ${queryString}
request body: ${bodyString}\n`;
        this.logger.log(log);
      }

      fs.appendFile('logs/logs.main.txt', `${log}\n`, (err: Error) => {
        if (err) {
          console.log(err);
        }
      });
    });
  }
}
