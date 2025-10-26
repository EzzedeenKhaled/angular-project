// Represents current and daily weather data from the API
export interface WeatherData {
  // Current weather metrics
  current: {
    temperature_2m: number;       // Current temperature in °C
    relative_humidity_2m: number; // Humidity percentage
    apparent_temperature: number; // "Feels like" temperature
    precipitation: number;        // Precipitation in mm
    weather_code: number;         // Weather condition code
    wind_speed_10m: number;       // Wind speed in km/h
    wind_direction_10m: number;   // Wind direction in degrees
  };
  // Daily forecast data arrays
  daily: {
    time: string[];                // Dates of forecast
    temperature_2m_max: number[];  // Daily max temperatures
    temperature_2m_min: number[];  // Daily min temperatures
    weather_code: number[];        // Weather codes per day
    precipitation_sum: number[];   // Daily precipitation sum
  };
}

// Represents a location used for fetching weather data
export interface Location {
  name: string;       // City name
  latitude: number;   // Latitude coordinate
  longitude: number;  // Longitude coordinate
  country: string;    // Country name
}