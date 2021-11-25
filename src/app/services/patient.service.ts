import { getNgModuleById, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { httpOptions } from '../variables'; 
import { Patient } from '../classes/patient';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http :HttpClient) {


   }

   getAll(s ?: string):Observable<Patient[]>{
    return this.http.get<Patient[]>(environment.backendUri+"patient" + (s == undefined ? "" : "?search=" + s), httpOptions)
   }

    delete(id ?: number): Observable<any>{
      return this.http.delete(environment.backendUri+"patient/" + id, httpOptions)
    }

    getById(id ?: number) :Observable<Patient>{
      return this.http.get<Patient>(environment.backendUri+"patient/" + id, httpOptions)
    }

add(p :Patient) : Observable<any>{
  return this.http.post<Patient[]>(environment.backendUri+"patient", p,httpOptions)
}

update(p:Patient) :Observable<any>{
  return this.http.put<Patient>(environment.backendUri+"patient/" + p.id, p,httpOptions)
}

   }

