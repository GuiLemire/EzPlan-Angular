import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { JourneePlanifiee } from 'src/app/models/journeePlanifiee';
import { SemainePlanifiee } from 'src/app/models/semainePlanifiee';
import { TachePlanifiee } from 'src/app/models/tachePlanifiee';
import { JourneesPlanifieesService } from 'src/app/services/journees-planifiees.service';
import { SemainesPlanifieesService } from 'src/app/services/semaines-planifiees.service';

@Component({
  selector: 'app-journees-planifiees',
  templateUrl: './journees-planifiees.component.html',
  styleUrls: ['./journees-planifiees.component.css']
})
export class JourneesPlanifieesComponent implements OnInit {
  @Input() semainePlanifieeID! : number;
  @Output() retourListeSemaines = new EventEmitter();
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

  retirerTache(tachePlanifee : TachePlanifiee)
  {
    if (confirm("Voulez-vous vraiment retirer la tâche " + tachePlanifee.tache?.nom + " ?"))
    {
      this.journeesPlanifieesService.retirerTache(tachePlanifee);
      setTimeout(() => {
        this.initialiserSemainePlanifiee();
      },1000); 
      setTimeout(() => {
        if (typeof this.semainePlanifiee.tachesPlanifiees?.length == 'undefined'){
          this.retourListeSemaines.emit();
        }
      },1100);   
    }
  }

  supprimerSemaine(){
    this.semainesPlanifieesService.supprimerSemainePlanifiee(this.semainePlanifiee);
    this.retourListeSemaines.emit();
  }
}
