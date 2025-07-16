import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherSearchComponent } from './components/weather-search/weather-search.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WeatherSearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Weather-Component';
}
