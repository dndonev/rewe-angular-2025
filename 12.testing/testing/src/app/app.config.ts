import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { mockBackendInterceptor } from './services/mock-backend.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // Provide HttpClient with mock backend interceptor for tutorial purposes
    // In production, remove the mock interceptor and connect to a real API
    provideHttpClient(withInterceptors([mockBackendInterceptor]))
  ]
};
