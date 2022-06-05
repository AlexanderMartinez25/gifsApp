import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  constructor(private http: HttpClient) { }

  private _historial: string[] = [];
  private apiKey: string = '1I3EAF0nVQhtxo7rnQBLEjNo8w1zoqEt'

  // TODO: Cambiar any por su tipo
  public resultados: any[] = []

  get historial() {
    return [...this._historial]
  }

  buscarGifs(query: string = '') {

    query = query.trim().toLocaleLowerCase();

    // verificamos si alguna palabra esta incluida para no repetir
    if (!this._historial.includes(query)) {
      // agregamos al arreglo
      this._historial.unshift(query);
      // guardamos solo 10
      this._historial = this._historial.slice(0, 10)
    }

    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=1I3EAF0nVQhtxo7rnQBLEjNo8w1zoqEt&q=${query}&limit=10`)
      .subscribe((resp: any) => {
        console.log(resp.data);
        this.resultados = resp.data;

      })
  }
}
