import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Importación del Servicio
import { WeatherService } from '../../services/weather.service';


@Component({
  selector: 'app-weather-search',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './weather-search.component.html',
  styleUrl: './weather-search.component.scss'
})
export class WeatherSearchComponent {

  cityControl = new FormControl('', [Validators.required, Validators.minLength(2)]);
  weatherData: any = null;
  isLoading = false;
  errorMessage:string | null = null;

  constructor(private weatherService: WeatherService) { }

  searchWeather(): void {
    if(this.cityControl.invalid)
      return
    

    this.isLoading = true;
    this.weatherData = null;
    this.errorMessage = null;

    const city = this.cityControl.value!;

    this.weatherService.getWeatherByCity(city).pipe(
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe({
      next: (data) => {
        this.weatherData = data;
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });
  }

  getWeatherIconUrl(iconCode: string): string {
    return `http://openweathermap.org/img/wn/${iconCode}@4x.png`;
  }


}
