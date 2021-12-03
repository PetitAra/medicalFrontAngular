import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  personneForm = new FormGroup({
    id: new FormControl('' , Validators.required),
    nom: new FormControl('' , Validators.required),
    prenom: new FormControl('' , Validators.required)
    });

  constructor() { }

  ngOnInit(): void {
    this.personneForm.setValue({nom: 'wick', prenom: 'john', id: 1});
  }

  afficherNom(){
    console.log(this.personneForm.value);

    console.log("La valeur de nom = " + this.personneForm.get("nom")?.value);
  }

}