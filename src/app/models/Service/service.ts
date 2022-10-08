import { Entreprise } from "../Entreprise/entreprise";

export class Service {

    public id_service !: string;
    public reference !: string;
    public libelle !: string;
    public description !: string;
    public taux_horaire !: number;
    public entreprise !: Entreprise;

}
