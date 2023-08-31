import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pais, PaisSmall } from '../interfaces/paises.interface';
import { Observable, combineLatest, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaisesService {
  private _baseUrl: string = 'https://restcountries.com/v3.1';
  private _regiones: string[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
  ];

  get regiones(): string[] {
    return [...this._regiones]; //desestructurarlo creando una copia
  }

  constructor(private http: HttpClient) {}

  getPaisesPorRegion(region: string): Observable<PaisSmall[]> {
    const url = `${this._baseUrl}/region/${region}?fields=name,cca2,ccn3`;
    return this.http.get<PaisSmall[]>(url);
  }

  getPaisPorCodigo(codigo: string): Observable<Pais[] | []> {
    if (!codigo) {
      return of([]);
    }
    const url = `${this._baseUrl}/alpha/${codigo}`;
    return this.http.get<Pais[]>(url);
  }

  getPaisPorCodigoSmall(codigo: string): Observable<PaisSmall> {
    const url = `${this._baseUrl}/alpha/${codigo}?fields=name,cca2`;
    return this.http.get<PaisSmall>(url);
  }

  getPaisesPorBorders(borders: string[]): Observable<PaisSmall[]> {
    if (!borders) {
      return of([]);
    }
    const peticiones: Observable<PaisSmall>[] = [];
    borders.forEach((codigo) => {
      const peticion = this.getPaisPorCodigoSmall(codigo);
      peticiones.push(peticion);
    });

    return combineLatest(peticiones); //contiene un arreglo con el producto de sus peticiones internas
  }
}
