import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HoraireDisponibilites } from '../models/horaireDisponibilites';
import * as CONST from '../constantes';

@Injectable({
  providedIn: 'root'
})
export class HorairesDisponibilitesService {
  constructor(private http: HttpClient) { }

  getHoraireDisponibiliteById(horaireDisponibilitesID : number) : Observable<HoraireDisponibilites>{
    return this.http.get<HoraireDisponibilites>(CONST.URL + "getHoraireDisponibilitesByID/" + horaireDisponibilitesID.toString());
  }  

  getHorairesDisponibilitesByUtilisateurID(utilisateurID : number) : Observable<HoraireDisponibilites[]>{
    return this.http.get<HoraireDisponibilites[]>(CONST.URL + "getHorairesDisponibilitesByUtilisateurID/" + utilisateurID.toString());
  }

  creerHoraireDisponibilite(utilisateurID : number, horaireDisponibilite : HoraireDisponibilites){
    return this.http.post<HoraireDisponibilites>(CONST.URL + "creerHoraireDisponibilites/" + utilisateurID.toString(),horaireDisponibilite).subscribe();
  }
}
