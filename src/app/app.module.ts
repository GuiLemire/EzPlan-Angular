import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TachesComponent } from './components/taches/taches.component';
import { HorairesDisponibilitesComponent } from './components/horaires-disponibilites/horaires-disponibilites.component';
import { HoraireDisponibilitesComponent } from './components/horaire-disponibilites/horaire-disponibilites.component';
import { DisponibiliteComponent } from './components/disponibilite/disponibilite.component';
import { FormsModule } from '@angular/forms';
import { TacheComponent } from './components/tache/tache.component';
import { SemainesPlanifieesComponent } from './components/semaines-planifiees/semaines-planifiees.component';
import { SemainePlanifieeComponent } from './components/semaine-planifiee/semaine-planifiee.component';
import { JourneesPlanifieesComponent } from './components/journees-planifiees/journees-planifiees.component';
import { JourneePlanifieeComponent } from './components/journee-planifiee/journee-planifiee.component';

@NgModule({
  declarations: [
    AppComponent,
    TachesComponent,
    HorairesDisponibilitesComponent,
    HoraireDisponibilitesComponent,
    DisponibiliteComponent,
    TacheComponent,
    SemainesPlanifieesComponent,
    SemainePlanifieeComponent,
    JourneesPlanifieesComponent,
    JourneePlanifieeComponent
  ],
  imports: [
    MatListModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
