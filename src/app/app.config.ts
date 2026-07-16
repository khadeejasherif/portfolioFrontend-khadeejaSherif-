import { ApplicationConfig, provideBrowserGlobalErrorListeners,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { isAuthInterceptor } from './interceptors/is-auth';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),provideHttpClient(
      withInterceptors([isAuthInterceptor])
    )
  ]
};
