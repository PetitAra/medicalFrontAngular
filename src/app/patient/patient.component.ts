import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Patient } from '../classes/patient';
import { Ville } from '../classes/ville';
import { PatientService } from '../services/patient.service';
import { VilleService } from '../services/ville.service';
import { AppComponent } from '../app.component';
import { RdvService } from '../services/rdv.service';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
  providers: [ConfigService]
})

export class PatientComponent implements OnInit {


  
    patients: Array<Patient> = [];
   patient: Patient = new Patient()
   villes: Array<Ville> =[];
   search: string="";
   errorMessage: string=""
   success: boolean = false
   patientRdv : Array<any> = [];


   @ViewChild("closebutton") closebuttonelement: any;
  
   constructor(private vs: VilleService, public ps: PatientService , private rdvs: RdvService
    , public config: ConfigService) {}


  getPatientRdv(): void {
    this.patientRdv = [];  }

  ngOnInit(): void {
    this.reloadPatients();
    this.getPatientRdv()
    this.vs.getAll().subscribe({
      next: (data) => { this.villes = data },
      error: (err) => { console.log(err.error.message) }
    });
  }

reloadPatients(): void {
  console.log("search ==" + this.search)
  this.patients=[];
 this.ps.getAll(this.search).subscribe(
  data => { 
    this.patients = data 

    // je boucle sur les patients pour faire une req http et récupérer les rdv de chaq patient
    data.forEach( patient => {
      this.rdvs.getAll(undefined , patient.id ).subscribe(
        drdv => { 
          if( patient.id != undefined )
            this.patientRdv[ patient.id  ] = drdv 
          }
      )

    }  )

    console.log( this.patientRdv )
  }
   //err => console.log("Une erreur est survenue")
 )
}
 cleanPatients():void{
   this.patients=[];
 }

 delete(id ?: number) : void{
   if(confirm('Etes vous sur?')){
   this.ps.delete(id).subscribe(
   data => { this.reloadPatients()}
   //err => console.log("Une erreur est survenue")
   )
   }

 }
 
 edit(id ?: number){
   this.ps.getById(id).subscribe(
     data => { this.patient= data}
     )
 }

 submitPatient(): void {
  let obs: Observable<any>;
  if (this.patient.id == undefined) { // Ajout
    obs = this.ps.add(this.patient);
  } else { // Edition
    obs = this.ps.update(this.patient);
  }

  obs.subscribe(
    {
      next: () => {
        this.reloadPatients();
        this.closebuttonelement.nativeElement.click();
        this.success = true;
        setTimeout(() => {                           // <<<---using ()=> syntax
          this.success = false;
        }, 5000);
      },
      error: (err) => {
        this.errorMessage = err.error.message;
      }
    }
  );
}

checkVille(v1: Ville, v2: Ville): boolean {
  return v1 != undefined && v2 != undefined && v1.id == v2.id;
}

 resetPatient(): void {
  this.errorMessage = "";
  this.patient = new Patient();
 }

 //getVille(): void {
  //this.villes = []; 
  //this.vs.getAll().subscribe(
  //  data => { this.villes = data }
  //);
 //}

}
