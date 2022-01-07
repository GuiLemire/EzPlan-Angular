import { Injectable } from '@angular/core';
import { Tache } from '../models/tache';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as CONST from '../constantes';

@Injectable({
  providedIn: 'root'
})
export class TachesService {

  supprimerTache(tacheID: number)
  {
    return this.http.delete<Tache>(CONST.URL + "supprimerTache/" + tacheID.toString()).subscribe(data => {
      alert(data);
    });
  }
  async updateTache(tache: Tache)
  {
    return this.http.patch<Tache>(CONST.URL + "updateTache" , tache).subscribe(data => {
      alert(data);
    });
  }
  constructor(private http: HttpClient) { }

  getTacheById(tacheID : number): Observable<Tache>{
    return this.http.get<Tache>(CONST.URL + "getTacheById/" + tacheID.toString());
  }

  getTachesByUtilisateurID(utilisateurID : number): Observable<Tache[]> {
    return this.http.get<Tache[]>(CONST.URL + "getTaches/" + utilisateurID.toString());
  }
  creerTache(utilisateurID:number, tache :Tache){
    return this.http.post<Tache>(CONST.URL + "creerTache/" + utilisateurID.toString(),tache).subscribe();
  }




  
}
