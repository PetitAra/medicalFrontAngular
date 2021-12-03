import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientComponent } from './patient/patient.component';
import { VilleComponent } from './ville/ville-details/ville.component';
import { RdvDetailsComponent } from './rdv/rdv-details/rdv-details.component';
import { RdvComponent } from './rdv/rdv.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { LeaveCityFormGuard } from './guard/leave-city-form.guard';
import { LeaveGuard } from './guard/leave.guard';
import { VilleDetailsComponent } from './ville/ville-details/ville-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  { path : "ville" , component: VilleComponent , canActivate: [AuthGuard] , /*canDeactivate:[LeaveCityFormGuard] */ },
  {path:"patient", component: PatientComponent, canActivate: [AuthGuard]},
  { path : "rdv" , component: RdvComponent, canActivate: [AuthGuard] },
  { path : "rdv/addedit/:id" , component: RdvDetailsComponent, canActivate: [AuthGuard] , canDeactivate:[LeaveGuard]  },
  { path : "login" , component: LoginComponent},
  { path : "ville/addedit/:id" , component: VilleDetailsComponent, canActivate: [AuthGuard]},
  { path : "" , component: DashboardComponent }
  //{ path : "logout", redirectTo: "login"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
