import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Tache } from 'src/app/models/tache';
import { TachesService } from 'src/app/services/taches.service';

@Component({
  selector: 'app-tache',
  templateUrl: './tache.component.html',
  styleUrls: ['./tache.component.css']
})
export class TacheComponent implements OnInit, OnChanges
{
  tache: Tache = { nom: "Ma tache", dureeApproximative: 15, dureeMaxConsecutive: 15, niveauDeStress: 0 }
  @Input() tacheID : number = -1;
  valide: boolean = true;
  @Output() ajouterNouvelleTache = new EventEmitter<Tache>();
  @Output() retourListe = new EventEmitter<void>();
  constructor(private tachesService : TachesService) { }

  
  ngOnChanges(changes: SimpleChanges): void
  {
    if(this.tacheID == -1){
      this.tache = { nom: "Ma tache", dureeApproximative: 15, dureeMaxConsecutive: 15, niveauDeStress: 0 };
    }
  }

  ngOnInit(): void
  {
    if(this.tacheID > -1){
      this.fetchTache();
    }
  }
  async fetchTache()
  {
    const tache$ = this.tachesService.getTacheById(this.tacheID);
    this.tache = await lastValueFrom(tache$);
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
  enregistrerTache(){
    this.tachesService.updateTache(this.tache);
    this.retourListe.emit();
  }

}
