import { getNgModuleById, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ville } from '../classes/ville';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class VilleService {

  constructor(private http :HttpClient, private config : ConfigService ) {


   }

   getAll(s ?: string):Observable<Ville[]>{
    console.log( environment.backendUri + "ville"  + ( s == undefined ? "" : "?search=" + s ) )
    return this.http.get<Ville[]>( environment.backendUri + "ville"  + ( s == undefined ? "" : "?search=" + s )
    , this.config.httpOptions ); 
   }

    delete(id ?: number): Observable<any>{
      return this.http.delete(environment.backendUri+"ville/" + id, this.config.httpOptions)
    }

    getById(id ?: number) :Observable<Ville>{
      return this.http.get<Ville>(environment.backendUri+"ville/" + id, this.config.httpOptions)
    }

add(v :Ville) : Observable<any>{
  return this.http.post<Ville[]>(environment.backendUri+"ville", v,this.config.httpOptions)
}

update(v:Ville) :Observable<any>{
  return this.http.put<Ville>(environment.backendUri+"ville/" + v.id, v,this.config.httpOptions)
}

   }

