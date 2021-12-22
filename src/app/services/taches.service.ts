import { Injectable } from '@angular/core';
import { Tache } from '../models/tache';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as CONST from '../constantes';

@Injectable({
  providedIn: 'root'
})
export class TachesService {
  constructor(private http: HttpClient) { }

  getTacheById(tacheID : number): Observable<Tache>{
    return this.http.get<Tache>(CONST.URL + "getTache/" + tacheID.toString());
  }

  getTachesByUtilisateurID(utilisateurID : number): Observable<Tache[]> {
    return this.http.get<Tache[]>(CONST.URL + "getTaches/" + utilisateurID.toString());
  }
  creerTache(utilisateurID:number, tache :Tache){
    return this.http.post<Tache>(CONST.URL + "creerTache/" + utilisateurID.toString(),tache).subscribe();
  }




  
}
