import { Component } from '@angular/core';
import { HorairesDisponibilitesService } from './services/horaires-disponibilites.service';
import * as CONST from './constantes';
import { lastValueFrom } from 'rxjs';
import { HoraireDisponibilites } from './models/horaireDisponibilites';
import { TachesService } from './services/taches.service';
import { Tache } from './models/tache';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent
{
  title = 'Mon planning';

  constructor(private horaireDisponibiliteService: HorairesDisponibilitesService, private tachesService: TachesService) { }


  async changerPage(page: string)
  {
    const horairesDisponibilites$ = this.horaireDisponibiliteService.getHorairesDisponibilitesByUtilisateurID(CONST.utilisateurID);
    const horairesDisponibilites: HoraireDisponibilites[] = await lastValueFrom(horairesDisponibilites$);
    const taches$ = this.tachesService.getTachesByUtilisateurID(CONST.utilisateurID);
    const taches: Tache[] = await lastValueFrom(taches$);
    if (page === 'Planning')
    {
      if (taches.length == 0)
      {
        alert("Vous devez d'abord créer une tâche.")
      }
      else if (horairesDisponibilites.length == 0)
      {
        alert("Vous devez d'abord créer un horaire de disponibilités.");
      }
      else {
        this.title = page;
      }
    }
    else {
      this.title = page;
    }
    
  }
}

