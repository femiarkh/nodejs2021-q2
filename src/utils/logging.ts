import { Request, Response, NextFunction } from 'express';
import { finished } from 'stream';
import fs from 'fs';
import chalk from 'chalk';

const colorLog = ({
  date,
  statusCode,
  method,
  ms,
}: {
  date: string;
  statusCode: number;
  method: string;
  ms: number;
}) => {
  let coloredStatusCode;
  const statusCodeString = statusCode.toString();
  if (statusCodeString.startsWith('2')) {
    coloredStatusCode = chalk.green(statusCodeString);
  } else if (
    statusCodeString.startsWith('4') ||
    statusCodeString.startsWith('5')
  ) {
    coloredStatusCode = chalk.redBright(statusCodeString);
  } else {
    coloredStatusCode = chalk.yellow(statusCodeString);
  }
  return {
    date: chalk.cyanBright(date),
    statusCode: coloredStatusCode,
    method: chalk.magentaBright(method),
    ms: `${chalk.bgWhite.red(`${ms}ms`)}`,
  };
};

export const middleware = (req: Request, res: Response, next: NextFunction) => {
  const { method, query, body, url } = req;
  const start = Date.now();
  next();
  finished(res, () => {
    const ms = Date.now() - start;
    const { statusCode } = res;

    const date = new Date().toLocaleString();
    const queryString = JSON.stringify(query);
    const bodyString = JSON.stringify(body);

    const log = `[${date}]
${method} ${url} ${statusCode} [${ms}ms]
query parameters: ${queryString}
request body: ${bodyString}\n`;
    const chalked = colorLog({ date, statusCode, method, ms });
    const coloredLog = `[${chalked.date}]
${chalked.method} ${url} ${chalked.statusCode} [${chalked.ms}]
query parameters: ${queryString}
request body: ${bodyString}\n`;

    console.log(coloredLog);

    fs.appendFile('logs.main.txt', `${log}\n`, (err) => {
      if (err) {
        console.log(err);
      }
    });
    // log errors in edition to main logging file
    if (
      res.statusCode.toString().startsWith('4') ||
      res.statusCode.toString().startsWith('5')
    ) {
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
${err.stack}\n`;
  const coloredLog = `${chalk.redBright(
    'Unhandled promise rejection happened :('
  )}
    [${chalk.cyanBright(new Date().toLocaleString())}]
    ${err.stack}\n`;

  console.log(coloredLog);

  fs.appendFileSync('logs.main.txt', `${log}\n`);
  fs.appendFileSync('logs.errors.txt', `${log}\n`);
  return null;
};

export const uncaughtException = (err: Error) => {
  const log = `Uncaught exception happened :(
[${new Date().toLocaleString()}]
${err.stack}\n`;
  const coloredLog = `${chalk.redBright('Uncaught exception happened :(')}
    [${chalk.cyanBright(new Date().toLocaleString())}]
    ${err.stack}\n`;

  console.log(coloredLog);

  fs.appendFileSync('logs.main.txt', `${log}\n`);
  fs.appendFileSync('logs.errors.txt', `${log}\n`);
  return null;
};
