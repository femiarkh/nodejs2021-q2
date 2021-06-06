import { Request, Response, NextFunction } from 'express';
import { finished } from 'stream';
import fs from 'fs';

export const middleware = (req: Request, res: Response, next: NextFunction) => {
  const { method, query, body, url } = req;
  const start = Date.now();
  next();
  finished(res, () => {
    const ms = Date.now() - start;
    const { statusCode } = res;
    const log = `[${new Date().toLocaleString()}]
${method} ${url} ${statusCode} [${ms}ms]
query parameters: ${JSON.stringify(query)}
request body: ${JSON.stringify(body)}\n`;
    console.log(log);
    fs.appendFile('logs.main.txt', `${log}\n`, (err) => {
      if (err) {
        console.log(err);
      }
    });
    // log errors in edition to main logging file
    if (!res.statusCode.toString().startsWith('2')) {
      fs.appendFile('logs.errors.txt', `${log}\n`, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  });
};

export const unhandledRejection = (err: Error) => {
  const log = `Unhandled promise rejection happened :(
[${new Date().toLocaleString()}]
${err.name}: ${err.message}\n`;
  console.log(log);
  fs.appendFileSync('logs.main.txt', `${log}\n`);
  fs.appendFileSync('logs.errors.txt', `${log}\n`);
  return null;
};
