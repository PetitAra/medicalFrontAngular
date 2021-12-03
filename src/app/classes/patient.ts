import { Ville } from "./ville";

export class Patient {

    id ?: number
    nom ?: string
    prenom ?: string
    adresse ?: string
    dateNaissance ?: Date
    email ?: string
    telephone ?: string
    ville ?: Ville;
    
    constructor( _id ?: number, _nom ?: string, _prenom ?: string, _dateNaissance ?: Date , _email ?: string , _telephone ?: string, _adresse ?: string , _ville ?: Ville ){
        this.id = _id
        this.nom = _nom
        this.prenom = _prenom
        this.dateNaissance = _dateNaissance
        this.email = _email
        this.telephone = _telephone
        this.adresse = _adresse
        this.ville = _ville
    }
}
