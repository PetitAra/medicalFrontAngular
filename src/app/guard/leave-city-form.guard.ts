import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { VilleDetailsComponent } from '../ville/ville-details/ville-details.component';
import { VilleComponent } from '../ville/ville-details/ville.component';

@Injectable({
  providedIn: 'root'
})

export class LeaveCityFormGuard implements CanDeactivate<VilleDetailsComponent> {
  canDeactivate(
    component: VilleDetailsComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    if( component.cityForm.get("nom") != undefined || component.cityForm.get("codePostal") != undefined  ||
     component.cityForm.get("pays") != undefined)
      return confirm( "Êtes vous sur de vouloir quitter cette page ?" );

    return true; // l'utilisateur continue sa navigation
  }

}