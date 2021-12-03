import { getNgModuleById, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Patient } from '../classes/patient';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { ConfigService } from './config.service';


@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor( private http : HttpClient, private config : ConfigService ) {  }

   getAll(s ?: string):Observable<Patient[]>{
    return this.http.get<Patient[]>(environment.backendUri+"patient" + (s == undefined ? "" : "?search=" + s), this.config.httpOptions );
   }

    delete(id ?: number): Observable<any>{
      return this.http.delete( environment.backendUri + "patient/"+id , this.config.httpOptions )
    }

    getById(id ?: number) :Observable<Patient>{
      return this.http.get<Patient>( environment.backendUri + "patient/"+id , this.config.httpOptions ); 
    }

add(p :Patient) : Observable<any>{
  return this.http.post( environment.backendUri + "patient" , p , this.config.httpOptions ); 
}

update(p:Patient) :Observable<any>{
  return this.http.put<Patient>(environment.backendUri+"patient/" + p.id, p, this.config.httpOptions );
}

   }

