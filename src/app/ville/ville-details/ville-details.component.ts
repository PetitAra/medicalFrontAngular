import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ville } from 'src/app/classes/ville';
import { VilleService } from 'src/app/services/ville.service';

@Component({
  selector: 'app-ville-details',
  templateUrl: './ville-details.component.html',
  styleUrls: ['./ville-details.component.css']
})
export class VilleDetailsComponent implements OnInit {

  cityForm = new FormGroup({
    id : new FormControl("" , Validators.required),
    nom : new FormControl(""  , Validators.required ),
    codePostal : new FormControl(""  , Validators.required ),
    pays : new FormControl(""  , Validators.required)
  });

  constructor( private vs : VilleService , private activatedRoute : ActivatedRoute, private router : Router ) {
      console.log("contr VilleDetails");
   }

  ngOnInit(): void {
    let villeId = Number(this.activatedRoute.snapshot.paramMap.get('id'))
    if( villeId ){
      this.vs.getById( villeId ).subscribe(
        data => { 
          this.cityForm.setValue(data)
        }
      )
    }
  }

  submitForm(){
    let ville = this.cityForm.value

    console.log( ville ); 

    if( ville.id == undefined || ville.id == '' || ville.id == 0 ){
      this.vs.add(ville).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['ville'])
        }
      )
    }else{
      this.vs.update(ville).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['ville'])
        }
      )
    }

  }

}