import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthGuard } from '../auth.guard';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  httpOptions = {
    headers : new HttpHeaders({
      'Authorization' : "" 
    })
  }
  
  constructor( private guard : AuthGuard ) { 
    console.log( "creation d'un nv ConfigService" );
    
    this.httpOptions = {
      headers : new HttpHeaders({
        'Authorization' : "Basic " + guard.getUser().password
      })
    } 
  } 

}