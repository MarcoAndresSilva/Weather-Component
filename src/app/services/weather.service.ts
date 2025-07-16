import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  // variables de entorno
  private apiKey = '7925f83ebabc9319a5a41f84266ccd4b';
  private url = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) { }

  getWeatherByCity(city:string): Observable<any> {
    // usamos params para construir la url de forma segura y limpia
    const options = new HttpParams()
      .set('q', city)
      .set('appid', this.apiKey)
      .set('units', 'metric')
      .set('lang', 'es');

    return this.http.get(this.url, { params: options }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocurrio un erro desconocido. Inténtalo de nuevo más tarde.';
    if(error.status === 401) {
      errorMessage = 'Error de autenticación. Por favor, verifica tu ApiKey.';
    }else if(error.status === 404) {
      errorMessage = `Ciudad no encontrada. "${error.url?.split('q=')[1].split('&')[0]}" Por favor, verifica el nombre de la ciudad.`;
    }

    return throwError(() => new Error(errorMessage));
  }


}
