import { Component, OnInit } from '@angular/core';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { HorairesDisponibilitesService } from 'src/app/services/horaires-disponibilites.service';
import { HoraireDisponibilites } from 'src/app/models/horaireDisponibilites';
import { TachesService } from 'src/app/services/taches.service';
import { Tache } from '../../models/tache';
import * as CONST from '../../constantes';

@Component({
  selector: 'app-taches',
  templateUrl: './taches.component.html',
  styleUrls: ['./taches.component.css']
})
export class TachesComponent implements OnInit {

  taches?: Tache[] = [{tacheID: 0, nom: '', dureeApproximative: 0, dureeMaxConsecutive: 0, niveauDeStress: 0}];
  horaires?: HoraireDisponibilites[];
  state: string = 'liste';

  constructor(private tachesService: TachesService,private horaireDisponibilitesService : HorairesDisponibilitesService) { }

  ngOnInit(): void {
   this.getTaches()  
  }

  private async getTaches(){
    const categories$ = this.tachesService.getTachesByUtilisateurID(CONST.utilisateurID);
    this.taches = await lastValueFrom(categories$);
  }
  creerTache(){
    this.state = 'nouvelleTache';
  }
  ajouterNouvelleTache(tache : Tache){
    if(!this.isNomTacheDejaUtilise(tache)){
      this.tachesService.creerTache(CONST.utilisateurID,tache);
      this.taches![this.taches!.length] = tache;
      alert("La tache " + tache.nom + " a été ajoutée avec succès.")
    }else{
      alert("La tache " + tache.nom + " n'a pas pu être ajoutée, le nom est déjà utilisé.")
    }
  }
  isNomTacheDejaUtilise(tache: Tache)
  {
    for(let singleTache of this.taches!){
      if(tache.nom === singleTache.nom){
        return true
      }
    }
    return false
  }

}


