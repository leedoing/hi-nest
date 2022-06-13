import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const startAt = process.hrtime();
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      const { statusCode, statusMessage } = response;
      const diff = process.hrtime(startAt);
      const responseTime = diff[0] * 1e3 + diff[1] * 1e-6;
      const contentLength = response.get('content-length');

      if (statusMessage === 'OK' || statusMessage === 'Created') {
        this.logger.log(
          `${method} ${originalUrl} ${statusCode} ${responseTime}ms ${contentLength} - ${userAgent} ${ip} ${statusMessage}`,
        );
      } else {
        this.logger.warn(
          `${method} ${originalUrl} ${statusCode} ${responseTime}ms ${contentLength} - ${userAgent} ${ip} ${statusMessage}`,
        );
      }
    });
    next();
  }
}