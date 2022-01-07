import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JourneePlanifiee } from '../models/journeePlanifiee';
import * as CONST from '../constantes';
import { TachePlanifiee } from '../models/tachePlanifiee';

@Injectable({
  providedIn: 'root'
})
export class JourneesPlanifieesService {

  constructor(private http : HttpClient) { }

  getJourneePlanifieeByID(journeePlanifieeID: number | undefined) : Observable<JourneePlanifiee>
  {
    return this.http.get<JourneePlanifiee>(CONST.URL + "getJourneePlanifieeByID/" + journeePlanifieeID?.toString());
  }

  retirerTache(tachePlanifiee: TachePlanifiee)
  {
    return this.http.delete(CONST.URL + "supprimerTachePlanifieeByID/" + tachePlanifiee.tachePlanifieeID?.toString()).subscribe(data => {
      alert(data);
    })
  }


}
