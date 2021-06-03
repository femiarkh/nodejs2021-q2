import { Request, Response, NextFunction } from 'express';
import { finished } from 'stream';
import fs from 'fs';

const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { method, query, body, url } = req;
  const start = Date.now();
  next();
  finished(res, () => {
    const ms = Date.now() - start;
    const { statusCode } = res;
    const log = `${method} ${url} ${statusCode} [${ms}ms]\nquery parameters: ${JSON.stringify(
      query
    )}\nbody: ${JSON.stringify(body)}`;
    console.log(log);
    fs.appendFile('logs.txt', `${log}\n\n`, (err) => {
      if (err) {
        console.log(err);
      }
    });
  });
};

export default loggingMiddleware;
