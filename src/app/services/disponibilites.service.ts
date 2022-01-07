import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as CONST from '../constantes';

@Injectable({
  providedIn: 'root'
})
export class DisponibilitesService {

  constructor(private http : HttpClient) { }

  getDisponibiliteByID(disponibiliteID: number)
  {
    return this.http.get(CONST.URL + 'getDisponibiliteByID/' + disponibiliteID.toString());
  }
}
