import { Action } from "@ngrx/store";
import { Ville } from "../classes/ville";

export enum VillesActionsTypes {
    GET_ALL_VILLES = "[Villes] Get All villes",
    GET_ALL_VILLES_SUCCESS = "[Villes] Get All villes Success",
    GET_ALL_VILLES_ERROR = "[Villes] Get All villes Error",
}

// action par défaut qui lance le chargement des villes
export class GetAllVilleAction implements Action{
    type:VillesActionsTypes = VillesActionsTypes.GET_ALL_VILLES
    constructor( public payload:any ){}
}

// payload:Ville[]  pke suite à l'exécution du service, ce qui est retourné c'est une liste de villes
export class GetAllVilleActionSuccess implements Action{
    type:VillesActionsTypes = VillesActionsTypes.GET_ALL_VILLES_SUCCESS
    constructor( public payload:Ville[] ){}
}

//si on a un message d'erreur, ce message va être remonté => payload:string
export class GetAllVilleActionError implements Action{
    type:VillesActionsTypes = VillesActionsTypes.GET_ALL_VILLES_ERROR
    constructor( public payload:string ){}
}

export type VillesActions = GetAllVilleAction | GetAllVilleActionError | GetAllVilleActionSuccess 