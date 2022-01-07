import { Component } from '@angular/core';
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
  title : string = 'Mon planning';
  state : string = 'listeSemaines';

  constructor() { }

  async changerPage(page: string)
  {
    this.title = page;
    if (this.title == "Mon planning"){
      this.state = "listeSemaines";
    }else {
      this.state = "other";
    }
  }

  stateSemaines(state : string){
    this.state = state;
  }
}

