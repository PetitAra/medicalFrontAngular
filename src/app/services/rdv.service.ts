import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Rdv } from '../classes/rdv';
import { AppComponent } from '../app.component';
import { ConfigService } from './config.service';


@Injectable({
  providedIn: 'root'
})
export class RdvService {

  constructor( private http : HttpClient, private config : ConfigService ) { 

  }

  getAll( datesearch ?: Date , idpatient ?: number ) : Observable<Rdv[]> {
    console.log( environment.backendUri + "rdv?" 
    + ( datesearch == undefined ? "" : "&datesearch=" + datesearch )
    + ( idpatient == undefined ? "" : "&patient=" + idpatient ) );

    return this.http.get<Rdv[]>( environment.backendUri + "rdv?" 
    + ( datesearch == undefined || (""+datesearch).length != 10 ? "" : "&datesearch=" + datesearch )
    + ( idpatient == undefined || (""+idpatient) == "" || idpatient == 0 ? "" : "&patient=" + idpatient )
    , this.config.httpOptions ); 
  }

  delete( id ?: number )  : Observable<any>{
    return this.http.delete( environment.backendUri + "rdv/"+id , this.config.httpOptions ); 
  }

  getById( id ?: number ) : Observable<Rdv>{
    return this.http.get<Rdv>( environment.backendUri + "rdv/"+id ,
    this.config.httpOptions ); 
  }

  add( rdv : Rdv ):Observable<any>{
    return this.http.post( environment.backendUri + "rdv" , rdv ,this.config.httpOptions ); 
  }

  update( rdv : Rdv  ): Observable<any>{
    return this.http.put( environment.backendUri + "rdv/"+rdv.id , rdv 
    ,this.config.httpOptions ); 
  } 
}