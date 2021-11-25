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
    
    public constructor(id?: number, nom?: string, prenom ?: string,adresse ?: string,  dateNaissance ?: Date,
        email ?: string,telephone ?: string, ville ?: Ville){
        this.id=id;
        this.nom=nom;
        this.prenom=prenom;
        this.adresse=adresse;
        this.dateNaissance=dateNaissance;
        this.email=email;
        this.telephone=telephone;
        this.ville=ville;
    }
}
