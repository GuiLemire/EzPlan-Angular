import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Disponibilite } from 'src/app/models/disponibilite';

@Component({
  selector: 'app-disponibilite',
  templateUrl: './disponibilite.component.html',
  styleUrls: ['./disponibilite.component.css']
})
export class DisponibiliteComponent implements OnInit
{
  disponibilite: Disponibilite = { journee: 1, heureDebut: 0, heureFin: 23.75 }
  heuresDebut: { name: string, value: number }[] = [];
  heuresFin: { name: string, value: number }[] = [];
  valide: boolean = true;
  @Output() ajouterNouvelleDisponibilite = new EventEmitter<Disponibilite>();

  constructor() { }

  ngOnInit(): void
  {
    this.initialiserHeuresDebut();
    this.initisaliserHeuresFin();
  }
  initisaliserHeuresFin()
  {
    this.initialiserSelectHeure(this.heuresFin, 1);
  }
  initialiserHeuresDebut()
  {
    this.initialiserSelectHeure(this.heuresDebut, 0);
  }
  initialiserSelectHeure(heures: { name: string; value: number; }[], indexDepart: number)
  {
    let name: string;
    let value: number;
    let minutes: string;
    for (var i = indexDepart; i < 96 + indexDepart; i++)
    {
      minutes = (15 * (i % 4)).toString();
      minutes = minutes.length == 1 ? minutes + "0" : minutes;
      name = Math.floor(i / 4).toString() + ":" + minutes;
      value = i / 4
      if(value == 24) {
        name = "23:59"
      }
      heures[heures.length] = { name: name, value: value }
    }
  }
  validerHeures() : boolean
  {
    this.valide = (Number(this.disponibilite.heureDebut!) < Number(this.disponibilite.heureFin!))
    if(!this.valide){
      this.afficherAlertErreur();
    }
    return this.valide;
  }
  afficherAlertErreur()
  {
    alert("L'heure de début doit être inférieure à l'heure de fin!");
  }
  ajouterDisponibilite(){
    if(this.validerHeures()){
      this.ajouterNouvelleDisponibilite.emit(this.disponibilite);
    } else {
      this.afficherAlertErreur();
    }
  }
}
