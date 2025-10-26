import { ApplicationConfig, provideZoneChangeDetection, provideBrowserGlobalErrorListeners, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { routes } from './app.routes';
import { environment } from '../environments';
import { HttpClientModule } from '@angular/common/http';

/**
 * Root application configuration.
 * Provides essential services for the app:
 * - HTTP requests
 * - Global error handling
 * - Zone-based change detection
 * - Router
 * - Firebase app and authentication
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // Import HttpClientModule to enable HTTP requests
    importProvidersFrom(HttpClientModule),

    // Enable global error listeners
    provideBrowserGlobalErrorListeners(),

    // Optimize change detection by coalescing events
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Set up Angular router with defined routes
    provideRouter(routes),

    // Initialize Firebase app with environment configuration
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),

    // Provide Firebase Authentication service
    provideAuth(() => getAuth())
  ]
};
