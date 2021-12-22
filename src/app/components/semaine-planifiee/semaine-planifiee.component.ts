import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { HoraireDisponibilites } from 'src/app/models/horaireDisponibilites';
import { SemainePlanifiee } from 'src/app/models/semainePlanifiee';
import { Tache } from 'src/app/models/tache';
import { TachePlanifiee } from 'src/app/models/tachePlanifiee';
import { HorairesDisponibilitesService } from 'src/app/services/horaires-disponibilites.service';
import { SemainesPlanifieesService } from 'src/app/services/semaines-planifiees.service';
import { TachesService } from 'src/app/services/taches.service';
import * as CONST from '../../constantes';

@Component({
  selector: 'app-semaine-planifiee',
  templateUrl: './semaine-planifiee.component.html',
  styleUrls: ['./semaine-planifiee.component.css']
})
export class SemainePlanifieeComponent implements OnInit
{
  semainePlanifiee: SemainePlanifiee = new SemainePlanifiee();
  tachesPourAjouter: Tache[] = [];
  tachesPourPlanifier: TachePlanifiee[] = [];
  horairesDisponibilites : HoraireDisponibilites[] = [];
  dateSemaine: string = new Date(Date.now()).toISOString().substring(0, 10);
  dateMin?: string;
  dateMax?: string;
  nomTachePourAjouter: string = "Choisir";
  valide: boolean = true;
  constructor(private tachesService: TachesService, private horairesDisponibilitesService : HorairesDisponibilitesService, private semainesPlanifieesService : SemainesPlanifieesService) { }

  ngOnInit(): void
  {
    this.initialiserDates();
    this.initialiserTachesPourAjouter();
    this.initialiserHorairesDisponibilites();
  }
  async initialiserHorairesDisponibilites()
  {
    const horaires$ = this.horairesDisponibilitesService.getHorairesDisponibilitesByUtilisateurID(CONST.utilisateurID);
    this.horairesDisponibilites = await lastValueFrom(horaires$);
    this.semainePlanifiee.horaireDisponibilites = this.horairesDisponibilites[0];
  }
  initialiserDates()
  {
    this.dateMin = this.semainePlanifiee.dateDebut.toISOString().substring(0, 10);
    var date = new Date(this.semainePlanifiee.dateDebut);
    date.setDate(date.getDate() + 6);
    this.dateMax = date.toISOString().substring(0, 10); 
    if(new Date(this.dateMax).getDate() - new Date(this.dateMin).getDate() == 7){
      date = new Date(this.dateMin);
      date.setDate(date.getDate() + 1);
      this.dateMin = date.toISOString().substring(0,10);
    }
  }
  async initialiserTachesPourAjouter()
  {
    const taches$ = this.tachesService.getTachesByUtilisateurID(CONST.utilisateurID);
    this.tachesPourAjouter = await lastValueFrom(taches$);
  }
  ajouterTachePourPlanifier(tache: Tache)
  {
    const index = this.tachesPourAjouter.indexOf(tache);
    if (index > -1)
    {
      this.tachesPourAjouter.splice(index, 1);
      this.tachesPourPlanifier[this.tachesPourPlanifier.length] = new TachePlanifiee(tache);
      this.nomTachePourAjouter = "Choisir";
    }
  }
  syncDates()
  {
    this.semainePlanifiee.dateDebut = this.getDateDernierDimanche(this.dateSemaine);
    this.initialiserDates();
    this.initialiserTachesPourAjouter();
    this.tachesPourPlanifier = [];
    this.valide = true;
  }
  getDateDernierDimanche(dateSemaine: string): Date
  {
    let date = new Date(dateSemaine);
    if (date.getDay() != 6)
    {
      date.setDate(date.getDate() - (date.getDay() + 1))
    }
    return date;
  }
  planifierSemaine()
  {
    this.valide = this.validerTachesPourPlanifiees();
    if (this.valide)
    {
      this.semainePlanifiee.tachesPlanifiees = this.tachesPourPlanifier;
      this.semainesPlanifieesService.planifierSemaine(this.semainePlanifiee,CONST.utilisateurID);
    }
  }
  validerTachesPourPlanifiees(): boolean
  {
    for (let tachePlanifiee of this.tachesPourPlanifier)
    {
      if (typeof tachePlanifiee.dateEcheance === 'undefined')
        return false;
    }
    return true;
  }

}
