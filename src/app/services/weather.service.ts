import { Injectable, signal, computed } from '@angular/core';
import { WeatherData, Location } from '../models/weather.models';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  weatherData = signal<WeatherData | null>(null); // Holds weather API data
  currentLocation = signal<Location | null>(null); // Selected city location
  loading = signal(false); // Loading state
  error = signal<string | null>(null); // Error message
  message = signal<string | null>(null); // Informational message

  forecastDays = computed(() => this.weatherData()?.daily.time || []); // 7-day forecast dates

  // Map weather code to Material icon
  getWeatherIcon(code: number): string {
    const weatherIcons: { [key: number]: string } = {
      0: 'wb_sunny', 1: 'wb_sunny', 2: 'cloud_queue', 3: 'cloud',
      45: 'filter_drama', 48: 'filter_drama', 51: 'grain', 53: 'grain', 55: 'grain',
      61: 'umbrella', 63: 'umbrella', 65: 'umbrella', 71: 'ac_unit', 73: 'ac_unit',
      75: 'ac_unit', 77: 'ac_unit', 80: 'umbrella', 81: 'umbrella', 82: 'umbrella',
      85: 'ac_unit', 86: 'ac_unit', 95: 'flash_on', 96: 'flash_on', 99: 'flash_on'
    };
    return weatherIcons[code] || 'wb_sunny';
  }

  // Map weather code to description
  getWeatherDescription(code: number): string {
    const descriptions: { [key: number]: string } = {
      0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
      45: 'Foggy', 48: 'Depositing rime fog', 51: 'Light drizzle', 53: 'Moderate drizzle',
      55: 'Dense drizzle', 61: 'Slight rain', 63: 'Moderate rain', 65: 'Heavy rain',
      71: 'Slight snow', 73: 'Moderate snow', 75: 'Heavy snow', 77: 'Snow grains',
      80: 'Slight rain showers', 81: 'Moderate rain showers', 82: 'Violent rain showers',
      85: 'Slight snow showers', 86: 'Heavy snow showers', 95: 'Thunderstorm',
      96: 'Thunderstorm with slight hail', 99: 'Thunderstorm with heavy hail'
    };
    return descriptions[code] || 'Unknown';
  }

  // Format date as Today/Tomorrow/Weekday
  formatDay(dateStr: string): string {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    else if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    else return date.toLocaleDateString('en-US', { weekday: 'short' });
  }
}