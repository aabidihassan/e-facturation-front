import { Entreprise } from "../Entreprise/entreprise";
import { Facture } from "../Facture/facture";

export class Client {

    public id_client !: number;
    public reference !: string;
    public type !: string;
    public raison !: string;
    public nom !: string;
    public telephone!: string;
    public email !: string;
    public adresse !: string;
    public region !: string;
    public pays !: string;
    public ville !: string;
    public code_postal !: string;
    public factures !: Array<Facture>;
    public entreprise !: Entreprise;
}
