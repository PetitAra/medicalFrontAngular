import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export const httpOptions ={
    headers : new HttpHeaders({
      'Authorization' : environment.authorization 
    })
  }