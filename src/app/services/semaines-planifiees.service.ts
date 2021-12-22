import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SemainePlanifiee } from '../models/semainePlanifiee';
import * as CONST from '../constantes';

@Injectable({
  providedIn: 'root'
})
export class SemainesPlanifieesService {

  constructor(private http : HttpClient) { }

  getSemainesPlanifiees(utilisateurID: number) : Observable<SemainePlanifiee[]>
  {
    return this.http.get<SemainePlanifiee[]>(CONST.URL + "getSemainesPlanifiees/" + utilisateurID.toString());
  }

  planifierSemaine(semainePlanifiee: SemainePlanifiee,utilisateurID : number)
  {
    return this.http.post<SemainePlanifiee>(CONST.URL + "planifierSemaine/" + utilisateurID.toString(),semainePlanifiee).subscribe();
  }

  getSemainePlanifieeByID(semainePlanifieeID: number)
  {
    return this.http.get<SemainePlanifiee>(CONST.URL + "getSemainePlanifiee/" + semainePlanifieeID.toString());
  }

}
