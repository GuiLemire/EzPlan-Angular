import { Component, Input, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { JourneePlanifiee } from 'src/app/models/journeePlanifiee';
import { SemainePlanifiee } from 'src/app/models/semainePlanifiee';
import { JourneesPlanifieesService } from 'src/app/services/journees-planifiees.service';
import { SemainesPlanifieesService } from 'src/app/services/semaines-planifiees.service';

@Component({
  selector: 'app-journees-planifiees',
  templateUrl: './journees-planifiees.component.html',
  styleUrls: ['./journees-planifiees.component.css']
})
export class JourneesPlanifieesComponent implements OnInit {
  @Input() semainePlanifieeID! : number;
  semainePlanifiee! : SemainePlanifiee;
  journeePlanifiee? : JourneePlanifiee;
  state : string = 'listeJournees';

  constructor(private semainesPlanifieesService : SemainesPlanifieesService, private journeesPlanifieesService : JourneesPlanifieesService) { }

  ngOnInit(): void {
    this.initialiserSemainePlanifiee();
  }

  async initialiserSemainePlanifiee()
  {
    const semaine$ = this.semainesPlanifieesService.getSemainePlanifieeByID(this.semainePlanifieeID);
    this.semainePlanifiee = await lastValueFrom(semaine$);
  }

  async afficherJourneePlanifiee(journeePlanifieeID? : number){
    const journeePlanifiee$ = this.journeesPlanifieesService.getJourneePlanifieeByID(journeePlanifieeID);
    this.journeePlanifiee = await lastValueFrom(journeePlanifiee$);
    this.state="journee";       
  }

}
