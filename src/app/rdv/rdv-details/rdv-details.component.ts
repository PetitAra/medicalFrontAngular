import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Patient } from 'src/app/classes/patient';
import { Rdv } from 'src/app/classes/rdv';
import { PatientService } from 'src/app/services/patient.service';
import { RdvService } from 'src/app/services/rdv.service';

@Component({
  selector: 'app-rdv-details',
  templateUrl: './rdv-details.component.html',
  styleUrls: ['./rdv-details.component.css']
})
export class RdvDetailsComponent implements OnInit {

  patients:Array<Patient> = []
  rdv : Rdv = new Rdv();
  errorMessage = ""

  constructor( private rdvService : RdvService ,  private ps : PatientService , 
                      private aRoute : ActivatedRoute , private router : Router) { 
    let rdvId = Number( this.aRoute.snapshot.paramMap.get('id') ); 
    if( rdvId > 0 ){
      this.rdvService.getById( rdvId ).subscribe(
        data => this.rdv = data
      );

    }
  }

  testchange(){
    console.log("change duree");
  }


  ngOnInit(): void {
    this.ps.getAll().subscribe(
      data => this.patients = data
    );
  }

  checkPatient( p1 : Patient, p2: Patient ):boolean{
    return p1 != undefined && p2!=undefined && p1.id == p2.id; 
  }

  submit(){
    let obs: Observable<any>;
    if (this.rdv.id == undefined) { // Ajout
      obs = this.rdvService.add(this.rdv);
    } else { // Edition
      obs = this.rdvService.update(this.rdv);
    }

    obs.subscribe(
      {
        next: () => {
          this.router.navigate(["rdv"])
        },
        error: (err) => {
          this.errorMessage = err.error.message;
        }
      }
    );
  }

}