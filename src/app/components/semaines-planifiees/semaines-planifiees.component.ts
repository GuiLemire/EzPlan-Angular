import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { HoraireDisponibilites } from 'src/app/models/horaireDisponibilites';
import { SemainePlanifiee } from 'src/app/models/semainePlanifiee';
import { Tache } from 'src/app/models/tache';
import { HorairesDisponibilitesService } from 'src/app/services/horaires-disponibilites.service';
import { SemainesPlanifieesService } from 'src/app/services/semaines-planifiees.service';
import { TachesService } from 'src/app/services/taches.service';
import * as CONST from '../../constantes';

@Component({
  selector: 'app-semaines-planifiees',
  templateUrl: './semaines-planifiees.component.html',
  styleUrls: ['./semaines-planifiees.component.css']
})
export class SemainesPlanifieesComponent implements OnInit
{
  @Output() backBtn = new EventEmitter<string>();
  @Input() state: string = 'listeSemaines';
  semainesPlanifiees: SemainePlanifiee[] = [];
  semainePlanifieeID!: number;

  constructor(private semainesPlanifieesService: SemainesPlanifieesService, private horaireDisponibilitesService: HorairesDisponibilitesService,
    private tachesService: TachesService) { }

  ngOnInit(): void
  {
    this.getSemainesPlanifiees()
  }
  async getSemainesPlanifiees()
  {
    const semaines$ = this.semainesPlanifieesService.getSemainesPlanifiees(CONST.utilisateurID);
    this.semainesPlanifiees = await lastValueFrom(semaines$);
  }
  async planifierSemaine()
  {
    const horairesDisponibilites$ = this.horaireDisponibilitesService.getHorairesDisponibilitesByUtilisateurID(CONST.utilisateurID);
    const horairesDisponibilites: HoraireDisponibilites[] = await lastValueFrom(horairesDisponibilites$);
    const taches$ = this.tachesService.getTachesByUtilisateurID(CONST.utilisateurID);
    const taches: Tache[] = await lastValueFrom(taches$);

    if (taches.length == 0)
    {
      alert("Vous devez d'abord créer une tâche.")
    }
    else if (horairesDisponibilites.length == 0)
    {
      alert("Vous devez d'abord créer un horaire de disponibilités.");
    }
    else
    {
      this.state = "nouvelleSemaine";
      this.backBtn.emit(this.state);
    }
  }
  afficherJourneesPlanifiees(semainePlanifieeID: number)
  {
    this.state = 'journees'
    this.semainePlanifieeID = semainePlanifieeID;
    this.backBtn.emit(this.state);
  }
  retourListe()
  {
    this.state = 'listeSemaines';
    this.backBtn.emit(this.state);
    setTimeout(() =>
    {
      this.getSemainesPlanifiees();
      this.semainePlanifieeID = -1;
    }, 1000);
  }

}


