import { Categorie } from "../Categorie/categorie";
import { Client } from "../Client/client";
import { Fournisseur } from "../Fournisseur/fournisseur";
import { Modele } from "../Modele/modele";
import { Produit } from "../Produit/produit";
import { Service } from "../Service/service";

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
    public taxe !: number;
    public categorie : Categorie = new Categorie;
    public produits !: Array<Produit>;
    public services !: Array<Service>;
    public clients !: Array<Client>;
    public fournisseurs !: Array<Fournisseur>;
    public modeles !: Array<Modele>;
    public file !: Blob;
}
