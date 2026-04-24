import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const skipInterceptor = request.headers.has('X-Skip-Error-Interceptor');

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (skipInterceptor) {
          return throwError(() => error);
        }

        let errorMessage = 'An unexpected error occurred.';
        let errorTitle = 'System Error';

        // Map status codes to titles/messages based on backend middleware
        switch (error.status) {
          case 401:
            errorTitle = 'Unauthorized';
            errorMessage = 'You are not authorized to perform this action. Please login again.';
            break;
          case 404:
            errorTitle = 'Not Found';
            errorMessage = error.error?.message || 'The requested resource was not found.';
            break;
          case 400:
            errorTitle = 'Bad Request';
            errorMessage = error.error?.message || 'Invalid request. Please check your input.';
            break;
          case 500:
            errorTitle = 'Server Error';
            errorMessage = 'A critical server error occurred. Please try again later.';
            break;
          default:
            errorMessage = error.error?.message || error.message || errorMessage;
            break;
        }
        
        // Global popup error message with specific branding
        alert(`[${errorTitle}] ${errorMessage}`);
        
        return throwError(() => error);
      })
    );
  }
}
