import { Entreprise } from "../Entreprise/entreprise";

export class Service {

    public id_service !: string;
    public libelle !: string;
    public description !: string;
    public prix !: number;
    public taux_horaire !: number;
    public entreprise !: Entreprise;

}
