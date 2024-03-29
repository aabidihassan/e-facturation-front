import { Entreprise } from "../Entreprise/entreprise";

export class Fournisseur {
    public id_fournisseur !: number;
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
    public entreprise !: Entreprise;
}
