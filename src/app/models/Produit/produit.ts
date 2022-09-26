import { Entreprise } from "../Entreprise/entreprise";

export class Produit {

    public reference !: string;
    public libelle !: string;
    public description !: string;
    public prix !: number;
    public quantite !: number;
    public entreprise !: Entreprise;

}
