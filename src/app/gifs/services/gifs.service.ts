import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private _historial: string[] = [];
  private apiKey: string = '1I3EAF0nVQhtxo7rnQBLEjNo8w1zoqEt';
  private sercicioURL = 'https://api.giphy.com/v1/gifs'

  public resultados: Gif[] = [];



  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  get historial() {
    return [...this._historial]
  }

  buscarGifs(query: string = '') {

    query = query.trim().toLocaleLowerCase();

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query)

    // verificamos si alguna palabra esta incluida para no repetir
    // agregamos al arreglo
    // guardamos solo 10
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.slice(0, 10)

      localStorage.setItem('historial', JSON.stringify(this._historial))
    }

    this.http.get<SearchGifsResponse>(`${this.sercicioURL}/search`, { params })
      .subscribe(resp => {
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados))
      })
  }
}
