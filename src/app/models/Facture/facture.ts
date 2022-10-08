import { Client } from "../Client/client";
import { LigneCommande } from "../LigneCommande/ligne-commande";
import { Reglement } from "../Reglement/reglement";

export class Facture {

    public numero !: number;
    public reference !: string;
    public creation !: string;
    public validation !: string;
    public echeance !: string;
    public ht !: number;
    public ttc !: number;
    public client !: Client;
    public statut !: string;
    public lignes !: Array<LigneCommande>;
    public reglements !: Array<Reglement>;
    public reste !: number;

}
