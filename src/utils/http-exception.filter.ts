import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Injectable,
} from '@nestjs/common';
import 'dotenv/config';

@Injectable()
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    const res = exception.getResponse();

    const payload = {
      timestamp: new Date().toISOString(),
      path: request.url,
      response: res,
    };

    if (process.env.USE_FASTIFY === 'true') {
      response.code(status).send(payload);
    } else {
      response.status(status).json(payload);
    }
  }
}
