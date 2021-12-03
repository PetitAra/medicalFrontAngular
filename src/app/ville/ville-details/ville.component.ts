import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ville } from 'src/app/classes/ville';
import { GetAllVilleAction, GetAllVilleActionError } from 'src/app/ngrx/villes.actions';
import { VillesStateEnum, VilleState} from 'src/app/ngrx/ville.reducer';
import { VilleService } from 'src/app/services/ville.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-ville',
  templateUrl: './ville.component.html',
  styleUrls: ['./ville.component.css']
})
export class VilleComponent implements OnInit {

  villes: Array<Ville> = [];
  ville: Ville = new Ville();
  search: string = ""
  errorMessage: string = ""
  success: boolean = false


  searchForm = new FormGroup({
    item : new FormControl(""),
  });

  @ViewChild('closebutton') closebuttonelement: any;

  VilleState$:Observable<VilleState>|null = null
  readonly VilleStateEnum = VillesStateEnum

  constructor(private vs: VilleService, private store:Store<any> ) {
  }

  ngOnInit(): void {
    //this.reloadCities();
    this.VilleState$ = this.store.pipe(
      map( (state) =>  state.catalogState )
    )

    this.store.dispatch( new GetAllVilleAction( {} ) )
  }

  reloadCities(): void {
    console.log("search == " + this.searchForm.get('item')?.value );

    this.store.dispatch( new GetAllVilleAction( {payload:this.searchForm.get('item')?.value} ) )
    /* this.vs.getAll().subscribe({
      next: (data) => { this.villes = data },
      error: (err) => { console.log(err.error.message) }
    }); */
  }

  clearCities(): void {
  }

  resetCity() {
    this.ville = new Ville();
  }

  delete(id: number | undefined): void {

    if (confirm("Êtes vous sur ?")) {
      this.vs.delete(id).subscribe(
        data => {
          this.reloadCities();
        }
        //, err => console.log( "Une erreur est survenue" )
      );
    }
  }

  edit(id?: number) {
    this.vs.getById(id).subscribe(
      data => { this.ville = data }
      //, err => console.log( "Une erreur est survenue" )
    );
  }

  submitCity() {
    let obs: Observable<any>;
    if (this.ville.id == undefined) { // Ajout
      obs = this.vs.add(this.ville);
    } else { // Edition
      obs = this.vs.update(this.ville);
    }

    obs.subscribe(
      {
        next: () => {
          this.reloadCities();
          this.closebuttonelement.nativeElement.click();
          this.success = true;
          setTimeout(() => {                           // <<<---using ()=> syntax
            this.success = false;
          }, 5000);
        },
        error: (err) => {
          this.errorMessage = err.error.message;
        }
      }
    );


  }

}