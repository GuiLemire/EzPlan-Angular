import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Disponibilite } from 'src/app/models/disponibilite';
import { HoraireDisponibilites } from 'src/app/models/horaireDisponibilites';
import { HorairesDisponibilitesService } from 'src/app/services/horaires-disponibilites.service';
import * as CONST from '../../constantes';

@Component({
  selector: 'app-horaire-disponibilites',
  templateUrl: './horaire-disponibilites.component.html',
  styleUrls: ['./horaire-disponibilites.component.css']
})
export class HoraireDisponibilitesComponent implements OnInit {
  nom : string = 'Mon horaire';
  state : string ='listeDisponibilites'
  disponibilites : Disponibilite[] = [];
  HEURES : string[] = CONST.HEURES;
  NOM_JOURNEES: string[] = CONST.NOM_JOURNEE;
  isNomValide : boolean = true;

  @Output() ajouterNouvelHoraire = new EventEmitter<HoraireDisponibilites>();

  constructor(private horaireService : HorairesDisponibilitesService) { }

  ngOnInit(): void {
  }

  verify(){
    alert(this.nom);
  }
  duree(disponibilite : Disponibilite){
    return Number(disponibilite.heureFin) - Number(disponibilite.heureDebut);
  }
  ajouterDisponibilite(){
    this.state = 'nouvelleDisponibilite';
  }
  ajouterNouvelleDisponibilite(disponibilite : Disponibilite){
    if(this.isDisponibiliteConflit(disponibilite)){
      alert("Cette disponibilité entre en conflit avec une autre, elle ne sera pas joutée.")
    }else{
      this.disponibilites[this.disponibilites.length] = disponibilite;
      this.state ='listeDisponibilite'
    }
  }
  isDisponibiliteConflit(disponibilite: Disponibilite) : boolean
  {
    for (let singleDisponibilite of this.disponibilites){
      if(disponibilite.journee === singleDisponibilite.journee){
        if(disponibilite.heureDebut! >= singleDisponibilite.heureDebut! && disponibilite.heureDebut! < singleDisponibilite.heureFin! ||
           disponibilite.heureFin! > singleDisponibilite.heureDebut! && disponibilite.heureFin! <= singleDisponibilite.heureFin!){
          return true;
        }
      }
      if(singleDisponibilite.journee === disponibilite.journee){
        if(singleDisponibilite.heureDebut! >= disponibilite.heureDebut! && singleDisponibilite.heureDebut! < disponibilite.heureFin! ||
          singleDisponibilite.heureFin! > disponibilite.heureDebut! && singleDisponibilite.heureFin! <= disponibilite.heureFin!){
          return true;
        }
      }
    }
    return false;
  }
  ajouterHoraire() { 
    if (this.nom.trim() === ""){
      alert("Veuillez saisir un nom d'horaire.")
      this.isNomValide = false;
    }else {
      this.ajouterNouvelHoraire.emit({nom:this.nom,disponibilites:this.disponibilites});  
    }   

  }

}
