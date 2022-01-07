import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() semainesPlanifiees?: SemainePlanifiee[];
  @Output() retourListe = new EventEmitter();
  semainePlanifiee: SemainePlanifiee = new SemainePlanifiee();
  tachesPourAjouter: Tache[] = [];
  tachesPourPlanifier: TachePlanifiee[] = [];
  horairesDisponibilites: HoraireDisponibilites[] = [];
  dateSemaine: string = new Date(Date.now()).toISOString().substring(0, 10);
  dateMin?: string;
  dateMax?: string;
  //nomTachePourAjouter: string = "Choisir";
  isInputValide: boolean = true;
  isDateValide: boolean = true;
  constructor(private tachesService: TachesService, private horairesDisponibilitesService: HorairesDisponibilitesService, private semainesPlanifieesService: SemainesPlanifieesService) { }

  ngOnInit(): void
  {
    this.initialiserDateSemaine();
    this.initialiserDatesMinMax();
    this.initialiserTachesPourAjouter();
    this.initialiserHorairesDisponibilites();
  }
  initialiserDateSemaine()
  {
    var ajourdhuis = new Date();
    this.semainePlanifiee.dateDebut = this.getDateDernierDimanche(ajourdhuis.toISOString().substring(0, 10));
    if (this.isDateDejaUtilisee(this.semainePlanifiee.dateDebut))
    {
      this.dateSemaine = this.prochaineDateValide();
      this.semainePlanifiee.dateDebut = new Date(this.dateSemaine);

    }
  }
  async initialiserHorairesDisponibilites()
  {
    const horaires$ = this.horairesDisponibilitesService.getHorairesDisponibilitesByUtilisateurID(CONST.utilisateurID);
    this.horairesDisponibilites = await lastValueFrom(horaires$);
    this.semainePlanifiee.horaireDisponibilites = this.horairesDisponibilites[0];
  }
  initialiserDatesMinMax()
  {
    this.dateMin = this.semainePlanifiee.dateDebut!.toISOString().substring(0, 10);
    var date = new Date(this.semainePlanifiee.dateDebut!);
    date.setDate(date.getDate() + 6);
    this.dateMax = date.toISOString().substring(0, 10);
    if (new Date(this.dateMax).getDate() - new Date(this.dateMin).getDate() == 7)
    {
      date = new Date(this.dateMin);
      date.setDate(date.getDate() + 1);
      this.dateMin = date.toISOString().substring(0, 10);
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
      //this.nomTachePourAjouter = "Choisir";
    }
  }
  syncDates()
  {
    var dateDernierDimanche = this.getDateDernierDimanche(this.dateSemaine);
    if (this.isDateDejaUtilisee(dateDernierDimanche))
    {
      alert("Cette semaine est déjà planifiée.")
      this.dateSemaine = this.prochaineDateValide();
    }
    else
    {
      this.semainePlanifiee.dateDebut = dateDernierDimanche;
      this.initialiserDatesMinMax();
      this.initialiserTachesPourAjouter();
      this.tachesPourPlanifier = [];
      this.isInputValide = true;
    }
  }
  prochaineDateValide(): string
  {
    var nouvelleDate = new Date(this.dateSemaine);
    nouvelleDate = this.getDateDernierDimanche(nouvelleDate.toISOString().substring(0, 10))
    while (this.isDateDejaUtilisee(nouvelleDate))
    {
      nouvelleDate.setDate(nouvelleDate.getDate() + 7)
    }
    return nouvelleDate.toISOString().substring(0, 10);
  }
  isDateDejaUtilisee(date: Date): boolean
  {
    for (var semainePlanifiee of this.semainesPlanifiees!)
    {
      if (semainePlanifiee.dateDebut.toString().substring(0, 10) == date.toISOString().substring(0, 10))
      {
        return true;
      }
    }
    return false;
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
    this.isInputValide = this.validerTachesPourPlanifiees();
    if (this.isInputValide)
    {
      this.semainePlanifiee.tachesPlanifiees = this.tachesPourPlanifier;
      this.semainesPlanifieesService.planifierSemaine(this.semainePlanifiee, CONST.utilisateurID);
      this.retourListe.emit();
    }
  }
  validerTachesPourPlanifiees(): boolean
  {
    for (let tachePlanifiee of this.tachesPourPlanifier)
    {
      if (typeof tachePlanifiee.dateEcheance === 'undefined')
      {
        alert("La tache " + tachePlanifiee.tache!.nom + " n'a pas de date d'échéance.")
        return false;
      }
    }
    return true;
  }
}
