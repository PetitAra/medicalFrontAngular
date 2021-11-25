import { getNgModuleById, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { httpOptions } from '../variables'; 
import { Ville } from '../classes/ville';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class VilleService {

  constructor(private http :HttpClient) {


   }

   getAll(s ?: string):Observable<Ville[]>{
    console.log( environment.backendUri + "ville"  + ( s == undefined ? "" : "?search=" + s ) )
    return this.http.get<Ville[]>( environment.backendUri + "ville"  + ( s == undefined ? "" : "?search=" + s )
    , httpOptions ); 
   }

    delete(id ?: number): Observable<any>{
      return this.http.delete(environment.backendUri+"ville/" + id, httpOptions)
    }

    getById(id ?: number) :Observable<Ville>{
      return this.http.get<Ville>(environment.backendUri+"ville/" + id, httpOptions)
    }

add(v :Ville) : Observable<any>{
  return this.http.post<Ville[]>(environment.backendUri+"ville", v,httpOptions)
}

update(v:Ville) :Observable<any>{
  return this.http.put<Ville>(environment.backendUri+"ville/" + v.id, v,httpOptions)
}

   }

