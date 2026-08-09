import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Use Angular's inject() function to grab our service
  const authService = inject(AuthService);
  const token = authService.getToken();

  // If we have a token, clone the request and attach the Authorization header
  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    
    // Pass the modified request to the next handler
    return next(clonedRequest);
  }

  // If there is no token (like when logging in), just send the original request
  return next(req);
};