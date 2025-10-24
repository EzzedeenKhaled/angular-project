import { Component, signal, computed, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
interface WeatherData {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    precipitation: number;
    weather_code: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
    precipitation_sum: number[];
  };
}

interface Location {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
}

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
  template: `

    <div class="weather-container">
      <!-- Search Section -->
      <div class="search-section">
        <mat-card class="search-card">
          <div class="search-content">
            <mat-form-field appearance="outline" class="search-field">
              <mat-label>Search city</mat-label>
              <input 
                matInput 
                [(ngModel)]="searchQuery" 
                (keyup.enter)="searchLocation()"
                placeholder="Enter city name...">
              <mat-icon matSuffix>search</mat-icon>
            </mat-form-field>
            <button mat-raised-button (click)="searchLocation()" class="search-btn">
              Search
            </button>
            
          </div>
        </mat-card>
      </div>

      <div *ngIf="loading()" class="loading-container">
        <mat-spinner></mat-spinner>
        <p>Loading weather data...</p>
      </div>

      <div *ngIf="error()" class="error-container">
        <mat-card class="error-card">
          <mat-icon color="warn">error_outline</mat-icon>
          <h3>Oops! Something went wrong</h3>
          <p>{{ error() }}</p>
        </mat-card>
      </div>

      <div *ngIf="weatherData() && !loading()" class="weather-content">
        <mat-card class="current-weather-card">
          <div class="location-header">
            <div>
              <h2>{{ currentLocation()?.name }}</h2>
              <p class="country">{{ currentLocation()?.country }}</p>
            </div>
            <mat-icon class="weather-icon-large">{{ getWeatherIcon(weatherData()!.current.weather_code) }}</mat-icon>
          </div>
          
          <div class="temperature-section">
            <div class="main-temp">
              <span class="temp-value">{{ weatherData()!.current.temperature_2m }}°</span>
              <span class="temp-unit">C</span>
            </div>
            <div class="weather-description">
              <p>{{ getWeatherDescription(weatherData()!.current.weather_code) }}</p>
              <p class="feels-like">Feels like {{ weatherData()!.current.apparent_temperature }}°C</p>
            </div>
          </div>

          <div class="weather-details">
            <div class="detail-item">
              <mat-icon>water_drop</mat-icon>
              <div>
                <p class="detail-label">Humidity</p>
                <p class="detail-value">{{ weatherData()!.current.relative_humidity_2m }}%</p>
              </div>
            </div>
            <div class="detail-item">
              <mat-icon>air</mat-icon>
              <div>
                <p class="detail-label">Wind Speed</p>
                <p class="detail-value">{{ weatherData()!.current.wind_speed_10m }} km/h</p>
              </div>
            </div>
            <div class="detail-item">
              <mat-icon>umbrella</mat-icon>
              <div>
                <p class="detail-label">Precipitation</p>
                <p class="detail-value">{{ weatherData()!.current.precipitation }} mm</p>
              </div>
            </div>
            <div class="detail-item">
              <mat-icon>explore</mat-icon>
              <div>
                <p class="detail-label">Wind Direction</p>
                <p class="detail-value">{{ weatherData()!.current.wind_direction_10m }}°</p>
              </div>
            </div>
          </div>
        </mat-card>

        <div class="forecast-section">
          <h3 class="forecast-title">7-Day Forecast</h3>
          <div class="forecast-grid">
            <mat-card *ngFor="let day of forecastDays(); let i = index" class="forecast-card">
              <p class="forecast-day">{{ formatDay(day) }}</p>
              <mat-icon class="forecast-icon">{{ getWeatherIcon(weatherData()!.daily.weather_code[i]) }}</mat-icon>
              <div class="forecast-temps">
                <span class="temp-max">{{ weatherData()!.daily.temperature_2m_max[i] }}°</span>
                <span class="temp-min">{{ weatherData()!.daily.temperature_2m_min[i] }}°</span>
              </div>
              <p class="forecast-precip">
                <mat-icon>water_drop</mat-icon>
                {{ weatherData()!.daily.precipitation_sum[i] }}mm
              </p>
            </mat-card>
          </div>
        </div>
      </div>
    </div>  
  `,
  styleUrl: './weather.component.css'
})
export class WeatherComponent implements OnInit {
  private http = inject(HttpClient);

  weatherData = signal<WeatherData | null>(null);
  currentLocation = signal<Location | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);
  searchQuery = '';

  forecastDays = computed(() => {
    return this.weatherData()?.daily.time || [];
  });

  ngOnInit() {
    this.getCurrentLocation();
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      this.loading.set(true);
      this.error.set(null);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          this.fetchWeatherData(lat, lon);
          this.reverseGeocode(lat, lon);
        },
        (err) => {
          this.error.set('Unable to get your location. Please search for a city.');
          this.loading.set(false);
          this.searchQuery = 'Beirut';
          this.searchLocation();
        }
      );
    } else {
      this.error.set('Geolocation is not supported by your browser.');
      this.loading.set(false);
    }
  }

  searchLocation() {
    if (!this.searchQuery.trim()) {
      this.error.set('Please enter a city name');
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.http.get<any>(`https://geocoding-api.open-meteo.com/v1/search?name=${this.searchQuery}&count=1&language=en&format=json`)
      .subscribe({
        next: (data) => {
          if (data.results && data.results.length > 0) {
            const location = data.results[0];
            this.currentLocation.set({
              name: location.name,
              latitude: location.latitude,
              longitude: location.longitude,
              country: location.country
            });
            this.fetchWeatherData(location.latitude, location.longitude);
          } else {
            this.error.set('City not found. Please try another search.');
            this.loading.set(false);
          }
        },
        error: (err) => {
          this.error.set('Failed to search location. Please try again.');
          this.loading.set(false);
        }
      });
  }

  private reverseGeocode(lat: number, lon: number) {
    this.http.get<any>(`https://geocoding-api.open-meteo.com/v1/search?latitude=${lat}&longitude=${lon}&count=1`)
      .subscribe({
        next: (data) => {
          if (data.results && data.results.length > 0) {
            const location = data.results[0];
            this.currentLocation.set({
              name: location.name,
              latitude: lat,
              longitude: lon,
              country: location.country
            });
          }
        },
        error: () => {
          this.currentLocation.set({
            name: 'Current Location',
            latitude: lat,
            longitude: lon,
            country: ''
          });
        }
      });
  }

  private fetchWeatherData(lat: number, lon: number) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`;

    this.http.get<WeatherData>(url).subscribe({
      next: (data) => {
        this.weatherData.set(data);
        this.loading.set(false);
        this.error.set(null);
      },
      error: (err) => {
        this.error.set('Failed to fetch weather data. Please try again.');
        this.loading.set(false);
      }
    });
  }

  getWeatherIcon(code: number): string {
    const weatherIcons: { [key: number]: string } = {
      0: 'wb_sunny',          // Clear sky
      1: 'wb_sunny',          // Mainly clear
      2: 'cloud_queue',       // Partly cloudy
      3: 'cloud',             // Overcast
      45: 'filter_drama',     // Fog
      48: 'filter_drama',     // Fog
      51: 'grain',            // Drizzle
      53: 'grain',
      55: 'grain',
      61: 'umbrella',         // Rain
      63: 'umbrella',
      65: 'umbrella',
      71: 'ac_unit',          // Snow
      73: 'ac_unit',
      75: 'ac_unit',
      77: 'ac_unit',
      80: 'umbrella',
      81: 'umbrella',
      82: 'umbrella',
      85: 'ac_unit',
      86: 'ac_unit',
      95: 'flash_on',         // Thunderstorm
      96: 'flash_on',
      99: 'flash_on'
    };

    return weatherIcons[code] || 'wb_sunny';
  }

  getWeatherDescription(code: number): string {
    const descriptions: { [key: number]: string } = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Foggy',
      48: 'Depositing rime fog',
      51: 'Light drizzle',
      53: 'Moderate drizzle',
      55: 'Dense drizzle',
      61: 'Slight rain',
      63: 'Moderate rain',
      65: 'Heavy rain',
      71: 'Slight snow',
      73: 'Moderate snow',
      75: 'Heavy snow',
      77: 'Snow grains',
      80: 'Slight rain showers',
      81: 'Moderate rain showers',
      82: 'Violent rain showers',
      85: 'Slight snow showers',
      86: 'Heavy snow showers',
      95: 'Thunderstorm',
      96: 'Thunderstorm with slight hail',
      99: 'Thunderstorm with heavy hail'
    };
    return descriptions[code] || 'Unknown';
  }

  formatDay(dateStr: string): string {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    }
  }
}