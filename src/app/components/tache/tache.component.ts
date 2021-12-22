import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Tache } from 'src/app/models/tache';

@Component({
  selector: 'app-tache',
  templateUrl: './tache.component.html',
  styleUrls: ['./tache.component.css']
})
export class TacheComponent implements OnInit
{
  tache: Tache = { nom: "Ma tache", dureeApproximative: 15, dureeMaxConsecutive: 15, niveauDeStress: 0 }
  valide: boolean = true;
  @Output() ajouterNouvelleTache = new EventEmitter<Tache>();
  constructor() { }

  ngOnInit(): void
  {
  }
  validerDureeConsecutiveMax()
  {
    this.valide = this.tache.dureeMaxConsecutive! <= this.tache.dureeApproximative!
    if (!this.valide)
    {
      this.messageErreur();
    }
  }
  messageErreur()
  {
    alert("La durée consécutive maximum doit être inférieure ou égale à la durée approximative.")
  }
  ajouterTache()
  {
    if (this.valide)
    {
      this.ajouterNouvelleTache.emit(this.tache);
      this.tache = { nom: "Ma tache", dureeApproximative: 15, dureeMaxConsecutive: 15, niveauDeStress: 0 };
    }
    else
    {
      this.messageErreur();
    }
  }

}
