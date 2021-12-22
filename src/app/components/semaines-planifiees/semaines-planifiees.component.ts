import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SemainePlanifiee } from 'src/app/models/semainePlanifiee';
import { SemainesPlanifieesService } from 'src/app/services/semaines-planifiees.service';
import * as CONST from '../../constantes';

@Component({
  selector: 'app-semaines-planifiees',
  templateUrl: './semaines-planifiees.component.html',
  styleUrls: ['./semaines-planifiees.component.css']
})
export class SemainesPlanifieesComponent implements OnInit {
  state :string = 'listeSemaines';
  semainesPlanifiees : SemainePlanifiee[] = [];
  semainePlanifieeID! : number;

  constructor(private semainesPlanifieesService : SemainesPlanifieesService) { }

  ngOnInit(): void {
    this.getSemainesPlanifiees()
  }
  async getSemainesPlanifiees()
  {
    const semaines$ = this.semainesPlanifieesService.getSemainesPlanifiees(CONST.utilisateurID);
    this.semainesPlanifiees = await lastValueFrom(semaines$);
  }
  planifierSemaine(){
    this.state = "nouvelleSemaine";
  }
  afficherJourneesPlanifiees(semainePlanifieeID : number){
    this.state = 'journees'
    this.semainePlanifieeID = semainePlanifieeID;
  }

}


