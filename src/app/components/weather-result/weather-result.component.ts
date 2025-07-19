import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-result',
  standalone: true;
  imports: [CommonModule],
  templateUrl: './weather-result.component.html',
  styleUrls: ['./weather-result.component.scss']
})
export class WeatherResultComponent {

  @Input() weatherData: any;
  @Input() isLoading: boolean = false;
  @Input() errorMessage: string | null = null;

  
  getWeatherIconUrl(iconCode: string): string {
    return `http://openweathermap.org/img/wn/${iconCode}@4x.png`;
  }

}
