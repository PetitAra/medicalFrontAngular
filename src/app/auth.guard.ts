import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './classes/user';
import { FooterComponent } from './footer/footer.component';

@Injectable({
  providedIn: 'root'
})


export class AuthGuard implements CanActivate, CanActivateChild {
  

constructor(private router : Router) {}


canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log("appel de canActivate")

if(sessionStorage.getItem("connected")){
  return true;
}
this.router.navigate(["login"])
return false;
      }

canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  isConnected():boolean{
    return sessionStorage.getItem("connected") != null; 
  }

  getUser() : User{
    let user : User; 
    let ss = sessionStorage.getItem("user")
    if( ss != null ){
      user = JSON.parse(ss);
      return user; 
    }
    return new User(); 
  }

  getUserFullname() : string | undefined{
    let user : User; 
    let ss = sessionStorage.getItem("user")
    console.log( ss )
    if( ss != null ){
      user = JSON.parse(ss);

      console.log( user )
      return user.name; 
    }else{
      return ""; 
    }

  }

}