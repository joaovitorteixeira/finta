import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const { status, message } = this.processError(exception);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }

  private processError(exception: any) {
    const { code } = exception;
    let status: number = HttpStatus.BAD_REQUEST;
    let message = 'Internal server error';

    switch (code) {
      case '23505':
        message = 'Database exception';
        break;

      default: {
        status =
          exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;
        break;
      }
    }

    return { status, message };
  }
}
