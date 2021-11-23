import { Component, OnInit } from '@angular/core';
import { Ville } from '../classes/ville';

@Component({
  selector: 'app-ville',
  templateUrl: './ville.component.html',
  styleUrls: ['./ville.component.css']
})
export class VilleComponent implements OnInit {

  villes: Array<Ville> = [];
 
  constructor() {

    this.villes.push(new Ville(1,"Paris",72200,"France"));
    this.villes.push(new Ville(2,"Marseille",13001,"France"));
     }

  ngOnInit(): void {
  }

}
