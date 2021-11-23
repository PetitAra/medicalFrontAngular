import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VilleComponent } from './ville/ville.component';

const routes: Routes = [
  {path:"ville", component: VilleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
