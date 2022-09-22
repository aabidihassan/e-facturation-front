import { Categorie } from "../Categorie/categorie";

export class Entreprise {
    public id_entreprise !: number;
    public raison !: string;
    public telephone1 !: string;
    public telephone2 !: string;
    public adresse1 !: string;
    public adresse2!: string;
    public email !: string;
    public pays !: string;
    public region !: string;
    public code_postal !: string;
    public logo !: string;
    public taxe !: string;
    public categorie : Categorie = new Categorie;
}
