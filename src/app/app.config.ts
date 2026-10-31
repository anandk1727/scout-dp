import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import { customPreset } from '@shared/ui';
import { API_BASE_URL } from '@shared/utils';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    providePrimeNG({
      license:
        'eyJpZCI6IjVjYjY1NmZiLTNhMWMtNGNlYi1iZDFjLTI4MGQ2YzZmZmI1ZCIsInByb2R1Y3QiOiJwcmltZXVpIiwidGllciI6ImNvbW11bml0eSIsInR5cGUiOiJkZXYiLCJpYXQiOjE3OTM0MzE4NzksImV4cCI6MTgyNDk2Nzg3OX0.e41yP_nh9m-3v8BSN480lHCm6MVYtXCm10FV4C8zVk3bIIwUKGOuyJBoo4mGNWJCvvCZ0cGXPHslv1dyDfiQBg',
      theme: {
        preset: customPreset,
        options: {
          darkModeSelector: '.dark',
          cssLayer: {
            name: 'primeng',
            order: 'theme, base, primeng',
          },
        },
      },
    }),
    { provide: API_BASE_URL, useValue: environment.apiBaseUrl },
  ],
};
