import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Disponibilite } from 'src/app/models/disponibilite';
import { HoraireDisponibilites } from 'src/app/models/horaireDisponibilites';
import { HorairesDisponibilitesService } from 'src/app/services/horaires-disponibilites.service';
import * as CONST from '../../constantes';

@Component({
  selector: 'app-horaires-disponibilites',
  templateUrl: './horaires-disponibilites.component.html',
  styleUrls: ['./horaires-disponibilites.component.css']
})
export class HorairesDisponibilitesComponent implements OnInit
{
  horairesDisponibilites?: HoraireDisponibilites[];
  disponibiliteSelectionnee?: Disponibilite;
  disponibilites?: Disponibilite[];
  state: string = 'liste';

  constructor(private horaireDisponibiliteService: HorairesDisponibilitesService) { }

  ngOnInit(): void
  {
    this.fetchHorairesDisponibilite();
  }
  private async fetchHorairesDisponibilite()  
  {
    const horaires$ = this.horaireDisponibiliteService.getHorairesDisponibilitesByUtilisateurID(CONST.utilisateurID);
    this.horairesDisponibilites = await lastValueFrom(horaires$);
  }
  nouvelHoraire()
  {
    this.state = 'nouvelHoraire';
  }
  ajouterNouvelHoraire(horaireDisponibilite: HoraireDisponibilites)
  {
    if (!this.isNomHoraireDejaUtilise(horaireDisponibilite))
    {
      this.horairesDisponibilites![this.horairesDisponibilites!.length] = horaireDisponibilite;
      this.horaireDisponibiliteService.creerHoraireDisponibilite(CONST.utilisateurID,horaireDisponibilite);
      alert("Le nouvel horaire a été ajouté avec succès.");
      this.state = 'liste';
    }else{
      alert("Le nouvel horaire n'a pas pu être ajouté, le nom est déjà utilisé.")
    }
  }
  isNomHoraireDejaUtilise(horaireDisponibilites: HoraireDisponibilites)
  {
    for (let singleHoraireDisponibilite of this.horairesDisponibilites!)
    {
      if (horaireDisponibilites.nom === singleHoraireDisponibilite.nom)
      {
        return true
      }
    }
    return false;
  }

}

