import { Entreprise } from "../Entreprise/entreprise";

export class Utilisateur {
    public username !: string;
    public password !: string;
    public entreprise : Entreprise  = new Entreprise();
}
