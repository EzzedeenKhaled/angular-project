import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { WeatherData } from '../models/weather.models';
import { WeatherService } from '../services/weather.service';
import { Title } from '@angular/platform-browser';
/**
 * WeatherComponent
 * Standalone Angular component for searching and displaying weather information.
 * Fetches current weather and 7-day forecast using Open-Meteo API.
 */
@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent implements OnInit {
  
  private title = inject(Title); // Inject Angular's Title service for setting the browser tab title

  // Inject HttpClient for API calls
  private http = inject(HttpClient);

  // Inject WeatherService for storing state
  weatherService = inject(WeatherService);

  // Search query for user input
  searchQuery = '';

  ngOnInit() {
    // Set the page title to "Weather" when this component is initialized
    this.title.setTitle('Weather');
    // Default city search on component init
    this.searchQuery = 'Beirut';
    this.searchLocation();
  }

  // Getter for reactive weather data
  get weatherData() { return this.weatherService.weatherData(); }
  get forecastDays() { return this.weatherService.forecastDays(); }
  get currentLocation() { return this.weatherService.currentLocation(); }
  get loading() { return this.weatherService.loading(); }
  get error() { return this.weatherService.error(); }
  get message() { return this.weatherService.message(); }

  /**
   * Searches for a location using the geocoding API
   * Updates weatherService with location or error
   */
  searchLocation() {
    if (!this.searchQuery.trim()) {
      this.weatherService.message.set('Please enter a city name');
      return;
    }

    this.weatherService.loading.set(true);
    this.weatherService.error.set(null);

    this.http.get<any>(`https://geocoding-api.open-meteo.com/v1/search?name=${this.searchQuery}&count=1&language=en&format=json`)
      .subscribe({
        next: (data) => {
          if (data.results && data.results.length > 0) {
            const location = data.results[0];
            this.weatherService.currentLocation.set({
              name: location.name,
              latitude: location.latitude,
              longitude: location.longitude,
              country: location.country
            });
            this.fetchWeatherData(location.latitude, location.longitude);
          } else {
            this.weatherService.message.set('City not found. Please try another search.');
            this.weatherService.loading.set(false);
          }
        },
        error: () => {
          this.weatherService.error.set('Failed to search location. Please try again.');
          this.weatherService.loading.set(false);
        }
      });
  }

  /**
   * Fetch weather data for given coordinates
   * Updates weatherService with current weather, daily forecast, and error state
   */
  private fetchWeatherData(lat: number, lon: number) {
    const url = 'https://api.open-meteo.com/v1/forecast';
    const params = {
      latitude: lat,
      longitude: lon,
      current: 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m',
      daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum',
      timezone: 'auto',
    };

    this.http.get<WeatherData>(url, { params }).subscribe({
      next: (data) => {
        this.weatherService.weatherData.set(data);
        this.weatherService.loading.set(false);
        this.weatherService.error.set(null);
      },
      error: () => {
        this.weatherService.error.set('Failed to fetch weather data. Please try again.');
        this.weatherService.loading.set(false);
      },
    });
  }

  /** Returns icon for a weather code */
  getWeatherIcon(code: number): string {
    return this.weatherService.getWeatherIcon(code);
  }

  /** Returns description for a weather code */
  getWeatherDescription(code: number): string {
    return this.weatherService.getWeatherDescription(code);
  }

  /** Formats a date string for display in the forecast */
  formatDay(dateStr: string): string {
    return this.weatherService.formatDay(dateStr);
  }
}
