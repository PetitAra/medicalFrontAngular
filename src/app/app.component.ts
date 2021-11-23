import { Component } from '@angular/core';
import { Ville } from './classes/ville';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'medical';

  ville=new Ville(1,"Paris",12345,"France");
}
