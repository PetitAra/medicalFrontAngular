export class Ville {

    id: number
    nom: string
    codePostal: number
    pays: string

    public constructor(_id: number, _nom: string, _codePostal : number, _pays : string){
        this.id=_id;
        this.nom=_nom;
        this.codePostal=_codePostal;
        this.pays=_pays;
    }
}
