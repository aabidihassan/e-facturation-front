import { SafeUrl } from "@angular/platform-browser";
import { Entreprise } from "../Entreprise/entreprise";

export class Produit {

    public id_produit !: number;
    public reference !: string;
    public libelle !: string;
    public description !: string;
    public prix !: number;
    public quantite !: number;
    public entreprise !: Entreprise;
    public photo !: string;
    public file !: SafeUrl | null;

}
