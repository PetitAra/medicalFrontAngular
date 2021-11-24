import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Ville } from '../classes/ville';

@Component({
  selector: 'app-ville',
  templateUrl: './ville.component.html',
  styleUrls: ['./ville.component.css']
})
export class VilleComponent implements OnInit {

  villes: Array<Ville> = [];
 
  httpOptions ={
   headers : new HttpHeaders({
     'Authorization' : "Basic YWRtaW46MTIzNA==" // admin - 1234
   })
 }


  constructor(private http : HttpClient) {

    //this.villes.push(new Ville(1,"Paris",72200,"France"));
    //this.villes.push(new Ville(2,"Marseille",13001,"France"));
     }

  ngOnInit(): void {
    this.http.get<Ville[]>("http://localhost:8080/api/ville", this.httpOptions).subscribe(
      data => { this.villes = data },
      //err => console.log("Une erreur est survenue")
    )
  }

}
