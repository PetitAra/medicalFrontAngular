import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { catchError, Observable, of } from "rxjs";
import { map, mergeMap} from 'rxjs/operators';
import { VilleService } from "../services/ville.service";
import { GetAllVilleActionError, GetAllVilleActionSuccess, VillesActionsTypes } from "./villes.actions";

@Injectable()
export class VilleEffects{

    constructor( private vs : VilleService , private effectsActions : Actions){

    }

    getAllVillesEffects:Observable<Action> = createEffect(
        () => this.effectsActions.pipe(
            ofType(VillesActionsTypes.GET_ALL_VILLES ),
            mergeMap( (action) => {
                return this.vs.getAll().pipe(
                    map( (villes) => new GetAllVilleActionSuccess(villes) ),
                    catchError( (err) => of( new GetAllVilleActionError( err.message ) ) )
                )
            } )
        )
    )


}