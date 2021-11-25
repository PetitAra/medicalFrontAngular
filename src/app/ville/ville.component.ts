import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Ville } from '../classes/ville';
import { VilleService } from '../services/ville.service';
import { httpOptions } from '../variables'; 

@Component({
  selector: 'app-ville',
  templateUrl: './ville.component.html',
  styleUrls: ['./ville.component.css']
})
export class VilleComponent implements OnInit {

  villes: Array<Ville> = [];
  ville: Ville =new Ville()
  search : string=""

  @ViewChild("closebutton") closebuttonelement: any;
 
  constructor(private vs : VilleService) {

    //this.villes.push(new Ville(1,"Paris",72200,"France"));
    //this.villes.push(new Ville(2,"Marseille",13001,"France"));
     }

     ngOnInit(): void {
       this.reloadCities();
     }

  reloadCities(): void {
    console.log("search ==" + this.search)
    this.villes=[];
    this.vs.getAll(this.search).subscribe(
      data => { this.villes = data },
      //err => console.log("Une erreur est survenue")
    )
  }
    cleanCities():void{
      this.villes=[];
    }

    delete(id ?: number) : void{
      if(confirm('Etes vous sur?')){
      this.vs.delete(id).subscribe(
      data => { this.reloadCities()}
      //err => console.log("Une erreur est survenue")
      )
      }

    }
    
    edit(id ?: number){
      this.vs.getById(id).subscribe(
        data => { this.ville= data}
        )
    }

    submitCity(){
      if (this.ville.id == undefined){
      this.vs.add(this.ville).subscribe(
        data => { 
          this.closebuttonelement.nativeElement.click();
          this.reloadCities()})
      }else{
        this.vs.update(this.ville).subscribe(
        data => { 
          this.closebuttonelement.nativeElement.click();
          this.reloadCities()})

      }
    }

    resetCity(){
    this.ville= new Ville();
    }
  
  }


