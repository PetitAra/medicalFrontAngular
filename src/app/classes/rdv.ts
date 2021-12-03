import { Patient } from "./patient"

export class Rdv {
    id ?: number
    dateHeure ?: Date
    duree ?: number
    note ?: string
    type ?: string
    patient ?: Patient


    constructor( _id ?: number, _dateHeure ?: Date, _duree ?: number, _note ?: string , _type ?: string , _patient ?: Patient ){
        this.id = _id
        this.dateHeure = _dateHeure
        this.duree = _duree
        this.note = _note
        this.type = _type
        this.patient = _patient
    }
}