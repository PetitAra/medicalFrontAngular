import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RdvDetailsComponent } from '../rdv/rdv-details/rdv-details.component';

@Injectable({
  providedIn: 'root'
})
export class LeaveGuard implements CanDeactivate<RdvDetailsComponent> {
  canDeactivate(
    component: RdvDetailsComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    if( component.rdv.patient != undefined || component.rdv.duree != undefined  || component.rdv.note != undefined  
      || component.rdv.dateHeure != undefined  
      || component.rdv.type != undefined   )
      return confirm( "Êtes vous sur de vouloir quitter cette page ?" );

    return true; // l'utilisateur continue sa navigation
  }

}