import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { WeatherComponent } from './weather.component';
import { WeatherService } from '../services/weather.service';

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;
  let weatherService: WeatherService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        WeatherService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
    weatherService = TestBed.inject(WeatherService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy(); // component instance exists
  });

  it('should set page title to Weather on init', () => {
    spyOn(component['title'], 'setTitle'); // track title service
    component.ngOnInit();
    expect(component['title'].setTitle).toHaveBeenCalledWith('Weather');
  });

  it('should set error if search query is empty', () => {
    component.searchQuery = '';
    component.searchLocation();
    expect(weatherService.error()).toBe('Please enter a city name'); // validate error
  });

  it('should return correct weather icon', () => {
    expect(component.getWeatherIcon(0)).toBe('wb_sunny'); // real service value
  });

  it('should return weather description', () => {
    spyOn(weatherService, 'getWeatherDescription').and.returnValue('Clear sky'); // mock service
    expect(component.getWeatherDescription(0)).toBe('Clear sky');
  });

  it('should format day correctly', () => {
    spyOn(weatherService, 'formatDay').and.returnValue('Monday'); // mock service
    expect(component.formatDay('2024-01-01')).toBe('Monday');
  });
});
