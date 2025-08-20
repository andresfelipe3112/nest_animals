import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { DomainException } from '../../domain/exceptions/domain.exception';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    let status: number;
    let message: string;
    let code: string;

    if (exception instanceof DomainException) {
      // Excepciones de dominio
      status = exception.statusCode;
      message = exception.message;
      code = exception.code;

      this.logger.warn(
        `Domain exception: ${code} - ${message}`,
        exception.stack,
      );
    } else if (exception instanceof HttpException) {
      // Excepciones HTTP de NestJS
      status = exception.getStatus();
      const response = exception.getResponse();
      message =
        typeof response === 'object'
          ? (response as any).message || exception.message
          : exception.message;
      code = 'HTTP_EXCEPTION';

      this.logger.warn(
        `HTTP exception: ${status} - ${message}`,
        exception.stack,
      );
    } else {
      // Errores no controlados
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal server error';
      code = 'INTERNAL_SERVER_ERROR';

      this.logger.error(
        `Unhandled exception: ${message}`,
        exception instanceof Error ? exception.stack : String(exception),
      );
    }

    const errorResponse = {
      statusCode: status,
      code,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
    };

    response.status(status).json(errorResponse);
  }
}
