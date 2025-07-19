import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { tap } from 'rxjs/operators'; // Añade 'tap' a los imports de rxjs/operators

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
  standalone: true,
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
  styleUrls: ['./weather-search.component.scss']
})
export class WeatherSearchComponent {

  cityControl = new FormControl('', [Validators.required, Validators.minLength(2)]);
  weatherData: any = null;
  isLoading = false;
  errorMessage:string | null = null;

  constructor(private weatherService: WeatherService) {
     console.log('WeatherSearchComponent cargado');
   }

 searchWeather(event: Event): void {
  event.preventDefault(); // 👈 Detiene la recarga de la página

  if(this.cityControl.invalid){
    console.log('El formulario es inválido, deteniendo la búsqueda.');
    return;
  }

  console.log('El formulario es válido, iniciando la búsqueda...');
  this.isLoading = true;
  this.weatherData = null;
  this.errorMessage = null;

  const city = this.cityControl.value!;
  console.log(`Llamando al servicio para la ciudad: ${city}`);

  this.weatherService.getWeatherByCity(city).pipe(
    tap(data => console.log('Tap 1 - Datos recibidos:', data)),
    finalize(() => {
      this.isLoading = false;
      console.log('Tap 2 - Finalize se ha ejecutado');
    })
  ).subscribe({
    next: (data) => {
      console.log('Bloque next - Asignando datos a weatherData:', data);
      this.weatherData = data;
    },
    error: (error) => {
      console.log('Bloque error - Asignando error a errorMessage:', error.message);
      this.errorMessage = error.message;
    }
  });
}

  getWeatherIconUrl(iconCode: string): string {
    return `http://openweathermap.org/img/wn/${iconCode}@4x.png`;
  }


}
