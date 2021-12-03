import { Action } from "@ngrx/store";
import { Ville } from "../classes/ville";
import { VillesActions, VillesActionsTypes } from "./villes.actions";

export enum VillesStateEnum{
    INITIAL = "Initial", 
    LOADING = "Loading",
    LOADED = "Loaded",
    ERROR = "Error"
}

export interface VilleState {
    villes : Array<Ville>,
    errorMessage : string,
    dataState : VillesStateEnum
}

const initialState : VilleState = {
    villes:[],
    errorMessage: "",
    dataState:VillesStateEnum.INITIAL
}

export function VilleReducer( state = initialState, action:Action ) : VilleState{
    switch(action.type){
        case VillesActionsTypes.GET_ALL_VILLES:
            return {...state, dataState:VillesStateEnum.LOADING}
        case VillesActionsTypes.GET_ALL_VILLES_SUCCESS:
            return {...state, dataState:VillesStateEnum.LOADED, villes: (<VillesActions>action).payload}
        case VillesActionsTypes.GET_ALL_VILLES_ERROR:
            return {...state, dataState:VillesStateEnum.ERROR, errorMessage:(<VillesActions>action).payload }
    }

    return {...state}
}