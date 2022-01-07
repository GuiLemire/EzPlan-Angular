import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Disponibilite } from 'src/app/models/disponibilite';
import { HoraireDisponibilites } from 'src/app/models/horaireDisponibilites';
import { HorairesDisponibilitesService } from 'src/app/services/horaires-disponibilites.service';
import * as CONST from '../../constantes';

@Component({
  selector: 'app-horaire-disponibilites',
  templateUrl: './horaire-disponibilites.component.html',
  styleUrls: ['./horaire-disponibilites.component.css']
})
export class HoraireDisponibilitesComponent implements OnInit, OnChanges {

  disponibiliteID : number = -1;
  state : string ='listeDisponibilites';
  horaireDisponibilites : HoraireDisponibilites = {nom : 'Mon horaire' , disponibilites : []};  
  HEURES : string[] = CONST.HEURES;
  NOM_JOURNEES: string[] = CONST.NOM_JOURNEE;
  isNomValide : boolean = true;

  @Input() horaireDisponibilitesID : number = -1;
  @Output() ajouterNouvelHoraire = new EventEmitter<HoraireDisponibilites>();
  @Output() retourListe = new EventEmitter<void>();

  constructor(private horaireService : HorairesDisponibilitesService) { }


  ngOnChanges(changes: SimpleChanges): void
  {
    if (this.horaireDisponibilitesID > -1){
      this.fetchHoraireDisponibilites();
    }
  }

  ngOnInit(): void {
    if (this.horaireDisponibilitesID > -1){
      this.fetchHoraireDisponibilites();
    }
  }

  async fetchHoraireDisponibilites()
  {
      const horaireDisponibilites$ = this.horaireService.getHoraireDisponibiliteById(this.horaireDisponibilitesID);
      this.horaireDisponibilites = await lastValueFrom(horaireDisponibilites$);
  }  

  duree(disponibilite : Disponibilite){
    return Number(disponibilite.heureFin) - Number(disponibilite.heureDebut);
  }
  ajouterDisponibilite(){
    this.state = 'disponibilite';
  }
  ajouterNouvelleDisponibilite(disponibilite : Disponibilite){
    if(this.isDisponibiliteConflit(disponibilite)){
      alert("Cette disponibilité entre en conflit avec une autre, elle ne sera pas joutée.")
    }else{
      this.horaireDisponibilites.disponibilites![this.horaireDisponibilites.disponibilites!.length] = disponibilite;
      this.state ='listeDisponibilite'
    }
  }
  isDisponibiliteConflit(disponibilite: Disponibilite) : boolean
  {
    for (let singleDisponibilite of this.horaireDisponibilites.disponibilites!){
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
    if (this.horaireDisponibilites.nom!.trim() === ""){
      alert("Veuillez saisir un nom d'horaire.")
      this.isNomValide = false;
    }else {
      this.ajouterNouvelHoraire.emit(this.horaireDisponibilites);  
    }   
  }

  enregistrerHoraire(){
    this.horaireService.updateHoraire(this.horaireDisponibilites);   
    this.retourListe.emit(); 
  }

  supprimerHoraire(){
    if (confirm("Voulez-vous vraiment supprimer l'horaire de disponibilités " + this.horaireDisponibilites.nom + " ?")){
      this.horaireService.supprimerHoraire(this.horaireDisponibilitesID);
    }
    this.retourListe.emit();
  }

  afficherDisponibilite(disponibiliteID : number){
    this.retirerDisponibiliteDeLaListe(disponibiliteID);
    this.state = 'disponibilite';
    this.disponibiliteID = disponibiliteID;
  }
  retirerDisponibiliteDeLaListe(disponibiliteID: number)
  {
    let index : number = -1;
    for (let d of this.horaireDisponibilites.disponibilites!){
      if (d.disponibiliteID == disponibiliteID)
      {
        index = this.horaireDisponibilites.disponibilites?.indexOf(d)!;
      }    
    }
    if (index > -1){
      this.horaireDisponibilites.disponibilites?.splice(index,1);
    }
  }

  supprimerDisponibilite(disponibiliteID : number){
    if (confirm("Voulez-vous vraiment supprimer cette disponibilité?")){
      this.retirerDisponibiliteDeLaListe(disponibiliteID);
    }
  }

}
